'use client'

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { LoadingButton } from './loading-button'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'

const formSchema = z.object({
  file: z.instanceof(File),
})

export default function UploadFileToProject({ 
  onUpload,
  params,
  } : {
    onUpload: () => void;
    params: { 
      projectId: Id<'projects'>
    }
}) {

    const uploadFile = useMutation(api.files.uploadFileToProject);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);

    const { user } = useUser();
    const projectNotification = useMutation(api.notifications.createNotification);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    const project = useQuery(api.projects.getProject, {
      projectId: params?.projectId
    });
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
      const url = await generateUploadUrl();

      const result = await fetch(url, { 
        method: "POST",
        headers: { "Content-Type": values.file.type },
        body: values.file,
      })

      const { storageId } = await result.json();

      await uploadFile({
        storageId: storageId as Id<"_storage">,
        name: values.file.name,
        type: values.file.type,
        projectId: project?._id,
      })
      onUpload();
      projectNotification({
        projectId: project?._id,
        type: 'upload',
        text: `${user?.fullName} has uploaded a new file to ${project?.title}`
      })
    }

    return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className='mt-8'>
              <FormControl>
                <Input {...fieldProps} type='file' 
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if(file) {
                      onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
          <LoadingButton 
            isLoading={form.formState.isSubmitting}
            loadingText="Uploading"
          >Upload</LoadingButton>
      </form>
    </Form>
    )
}