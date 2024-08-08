'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "./ui/textarea"
import { LoadingButton } from "./loadingButton"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useProjectId } from "@/app/dashboard/projects/context"
import { useUser } from "@clerk/nextjs"
import { useToast } from "./ui/use-toast"

const formSchema = z.object({
    emails: z.string(), 
});

export default function SendInviteForm({
    onSave
}: {
    onSave: () => void;
}) {

    const projectId = useProjectId();

    const currentProject = useQuery(api.projects.getProject, { projectId: projectId })

    const { user } = useUser();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emails: '',
        },
    })

    const sendInvite = useMutation(api.invites.sendProjectInvite)
    const createNotification = useMutation(api.notifications.createNotification)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const emailsList = values.emails.split(',').map(email => email.trim());
        for (const email of emailsList) {
          await sendInvite({
            projectId: projectId,
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
        })
        onSave();
      }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="emails"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Textarea placeholder="Enter emails separated by a comma" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <LoadingButton 
                        isLoading={form.formState.isSubmitting}
                        loadingText="Sending"
                    >Send Invite(s)</LoadingButton>
                </div>

            </form>
        </Form>
    )
}