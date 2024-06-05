'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Loader2 } from "lucide-react"
import { LoadingButton } from "./loadingButton"

import { Id } from "../../convex/_generated/dataModel"

const formSchema = z.object({
  message: z.string().min(2).max(50),
  projectId: z.string(),
})


export default function SendMessageForm({
  params
} : {
  params: {
    projectId: Id<"projects">
  }
}) {
  
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
            projectId: params.projectId 
        });
    }

    const sendMessage = useMutation(api.projects.sendMessage)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder={`Send Message`} {...field} className=""/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton 
                    isLoading={form.formState.isSubmitting}
                    loadingText="Sending"
                >Send</LoadingButton>
            </form>
        </Form>
    )
}