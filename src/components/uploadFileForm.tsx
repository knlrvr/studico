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
import { LoadingButton } from './loadingButton'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

const formSchema = z.object({
  file: z.instanceof(File),
})

export default function UploadFileForm({
    onUpload,
} : {
    onUpload: () => void;
}) {

    const uploadFile = useMutation(api.files.uploadFile);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
      const url = await generateUploadUrl();

      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": values.file.type },
        body: values.file,
      })

      const { storageId } = await result.json();

      await uploadFile({
        storageId: storageId as string,
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
                    onChange(file);
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