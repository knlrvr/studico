'use client'

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Input } from "@/components/ui/input"
import { LoadingButton } from './loadingButton'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { Textarea } from './ui/textarea'
import { useUser } from '@clerk/nextjs'

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  priority: z.string(),
})

export default function CreateTaskForm({ 
  params,
  } : {
    params: { 
      projectId: Id<'projects'>
    }
}) {

    const createTask = useMutation(api.tasks.createTask)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: '',
          description: '',
          category: '',
          priority: '',
        },
    })

    const project = useQuery(api.projects.getProject, {
      projectId: params?.projectId
    });

    const { user } = useUser();
  
    async function onSubmit(values: z.infer<typeof formSchema>) {

      await createTask({
        projectId: params.projectId,
        title: values.title,
        description: values.description,
        category: values.category,
        priority: values.priority,
        status: 'Incomplete',
        createdBy: {
          userId: user?.id as string,
          userImg: user?.imageUrl as string,
          userName: user?.fullName as string ?? user?.firstName as string,
        },
        assignedTo: {
          userId: user?.id as string,
          userImg: user?.imageUrl as string,
          userName: user?.fullName as string ?? user?.firstName as string,
        }
      })
    }

    return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='mt-4'>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='mt-4'>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className='mt-4'>
              <FormLabel>Task Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pre-production">Pre-production</SelectItem>
                    <SelectItem value="Recording">Recording</SelectItem>
                    <SelectItem value="Editing">Editing</SelectItem>
                    <SelectItem value="Mixing">Mixing</SelectItem>
                    <SelectItem value="Mastering">Mastering</SelectItem>
                    <SelectItem value="Post-production">Post-production</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className='mt-4'>
              <FormLabel>Task Priority</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <LoadingButton 
          isLoading={form.formState.isSubmitting}
          loadingText="Saving"
        >Save</LoadingButton>
      </form>
    </Form>
    )
}