import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { LoadingButton } from './loadingButton';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useProjectId } from '@/app/dashboard/projects/context';
import { useUser } from '@clerk/nextjs';
import { useToast } from './ui/use-toast';
import { X } from 'lucide-react';

const formSchema = z.object({
  emails: z.array(z.string().email())
});

export default function SendInviteForm({ onSave }: { onSave: () => void }) {
  const projectId = useProjectId();
  const currentProject = useQuery(api.projects.getProject, { projectId });

  const { user } = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [],
    },
  });

  const [inputValue, setInputValue] = useState('');

  const [emails, setEmails] = useState<string[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  const sendInvite = useMutation(api.invites.sendProjectInvite);
  const createNotification = useMutation(api.notifications.createNotification);

  const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
    const value = event.currentTarget.textContent || '';
    setInputValue(value);
    const lastChar = value[value.length - 1];

    if (lastChar === ',') {
      const trimmedValue = value.slice(0, -1).trim();
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        setEmails(prevEmails => [...prevEmails, trimmedValue]);
        event.currentTarget.textContent = '';
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pasteText = event.clipboardData.getData('Text');
    const value = pasteText.trim();

    const newEmails = value
      .split(',')
      .map(email => email.trim())
      .filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    form.setValue('emails', [...form.getValues('emails'), ...newEmails]);
    event.currentTarget.textContent = '';
    setInputValue('');
  };

  const removeEmail = (indexToRemove: number) => {
    const updatedEmails = emails.filter((_, index) => index !== indexToRemove);
    setEmails(updatedEmails);
    form.setValue('emails', updatedEmails);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [form.watch('emails')]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    for (const email of emails) {
      await sendInvite({
        projectId,
        projectName: currentProject?.title as string,
        inviteeEmail: email,
        inviterName: user?.fullName ?? '',
      });
    }
    await createNotification({
      type: 'invite',
      text: `${user?.fullName} has sent an invite`,
    });
    toast({
      description: 'Invite(s) have successfully sent!',
      variant: 'success',
    });
    onSave();
    setEmails([]);
    if (inputRef.current) {
      inputRef.current.textContent = '';
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-sm">
        <FormField
          control={form.control}
          name="emails"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="p-2 flex flex-wrap gap-2 gap-y-0.5 border rounded-md min-h-[6rem]">
                  {emails.map((email, index) => (
                    <span
                      key={index}
                      className="px-3 py-0.5 border rounded-full text-sm border-orange-500 text-orange-500 h-fit flex items-center"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() => removeEmail(index)}
                        className="ml-2 font-bold text-primary"
                      >
                        <X className="w-3 h-3 text-primary" size='icon' />
                      </button>
                    </span>
                  ))}
                  <div
                    ref={inputRef}
                    contentEditable
                    className="flex-1 outline-none min-w-[100px]"
                    onInput={handleInputChange}
                    onPaste={handlePaste}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <LoadingButton
            isLoading={form.formState.isSubmitting}
            loadingText="Sending"
          >
            Send Invite(s)
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}