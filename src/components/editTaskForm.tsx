'use client'

import { useEffect } from 'react'
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
  status: z.string(),
})

export default function EditTaskForm({ 
  params,
  projectId,
  } : {
    params: { 
      taskId: Id<'tasks'>
    },
    projectId: string,
}) {

    const { user } = useUser();

    const editTask = useMutation(api.tasks.editTask);

    const currentTask = useQuery(api.tasks.getCurrentTask, { 
        taskId: params.taskId 
    })

    const taskNotification = useMutation(api.notifications.createNotification)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: '',
          description: '',
          category: '',
          priority: '',
          status: '',
        },
    })

    useEffect(() => {
        if (currentTask) {
            form.reset({
                title: currentTask.title,
                description: currentTask.description,
                category: currentTask.category,
                priority: currentTask.priority,
                status: currentTask.status,
            })
        }
    }, [currentTask, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {

      await editTask({
        title: values.title,
        description: values.description,
        category: values.category,
        priority: values.priority,
        taskId: params?.taskId,
        status: values.status,
      });
      taskNotification({
        projectId: projectId,
        text: `${user?.fullName} has made changes to '${currentTask?.title}'`
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
                    <SelectValue defaultValue={`${currentTask?.category}`}/>
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
                    <SelectValue defaultValue={`${currentTask?.priority}`}/>
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

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className='mt-4'>
              <FormLabel>Task Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue defaultValue={`${currentTask?.status}`}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Incomplete">Incomplete</SelectItem>
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