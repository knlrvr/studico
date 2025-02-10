'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { LoadingButton } from "./loading-button"

import { Id } from "../../convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import {  useState } from "react"

const formSchema = z.object({
  message: z.string().min(2).max(500),
  projectId: z.string(),
  isEdited: z.boolean(),
})


export default function SendMessageForm({
  params
} : {
  params: {
    projectId: Id<"projects">
  }
}) {

    const { user } = useUser();
    const [message, setMessage] = useState<string>('');
            
    const sendMessage = useMutation(api.projects.sendMessage);
    const messageNotification = useMutation(api.notifications.createNotification);

    const currentProject = useQuery(api.projects.getProject, {
      projectId: params.projectId,
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
            projectId: params.projectId,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await sendMessage({ 
            message: values.message, 
            author: {
              sentBy: user?.fullName || '',
              image: user?.imageUrl || '',
              tokenIdentifier: user?.id || '',
            },
            isEdited: false,
            projectId: params.projectId 
        });
    }

    return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({
              message: message,
              author: {
                sentBy: user?.fullName || '',
                image: user?.imageUrl || '',
                tokenIdentifier: user?.id || '',
              },
              isEdited: false,
              projectId: params.projectId 
            })
            setMessage('');
            messageNotification({
              projectId: currentProject?._id,
              type: 'message',
              text: `${user?.fullName} has sent a new message to ${currentProject?.title}`
            })

          }}  
          className="flex items-end gap-2"
        >
          <div className="
              grid
              text-sm
              [&>textarea]:text-inherit
              [&>textarea]:resize-none
              w-full
              min-h-[40px]
          ">
            <textarea 
              rows={1}
              placeholder="Send Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="message-input hide-scroll w-full border px-2 py-1.5 rounded-md placeholder:text-neutral-500 text-sm"
            />
          </div>
          
          <LoadingButton 
            isLoading={form.formState.isSubmitting}
            loadingText="Sending"
          >Send</LoadingButton>
        </form>
    )
}