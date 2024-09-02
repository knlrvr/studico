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

import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { LoadingButton } from "./loading-button"
import { useOrganization } from "@clerk/nextjs"

const formSchema = z.object({
  title: z.string().min(2).max(50), 
  orgId: z.optional(z.string()),
})


export default function CreateProjectForm({
  onSave
} : {
  onSave: () => void;
}) {
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            orgId: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createProject({ 
          title: values.title,
          orgId: organization.organization?.id, 
        });
        onSave();
    }

    const createProject = useMutation(api.projects.createProject)
    const organization = useOrganization();

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Project Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <LoadingButton 
              isLoading={form.formState.isSubmitting}
              loadingText="Saving"
            >Save</LoadingButton>
          </div>

        </form>
      </Form>
    )
}