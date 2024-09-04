'use client'

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

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
import { LoadingButton } from './loading-button'

import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

import { Textarea } from './ui/textarea'

import { useUser } from '@clerk/nextjs'
import { useProjectId } from '@/app/dashboard/projects/context'

import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  date: z.string(),
  priority: z.string(),
  assignedTo: z.object({
    userId: z.string(),
    userName: z.string(),
    userImg: z.string()
  }),
})

export default function CreateTaskForm() {

    const projectId = useProjectId();

    const createTask = useMutation(api.tasks.createTask);
    const taskNotification = useMutation(api.notifications.createNotification);

    const getMembers = useQuery(api.projects.getProject, { projectId: projectId });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          assignedTo: {},
          title: '',
          description: '',
          category: '',
          priority: '',
          date: new Date().toISOString(),
        },
    })

    const project = useQuery(api.projects.getProject, {
      projectId: projectId
    });

    const { user } = useUser();
  
    async function onSubmit(values: z.infer<typeof formSchema>) {

      await createTask({
        projectId: projectId,
        title: values.title,
        description: values.description,
        category: values.category,
        priority: values.priority,
        status: 'Incomplete',
        completeByDate: values.date,
        createdBy: {
          userId: user?.id as string,
          userImg: user?.imageUrl as string,
          userName: user?.fullName as string ?? user?.firstName as string,
        },
        assignedTo: {
          userId: values.assignedTo?.userId as string,
          userName: values.assignedTo?.userName as string,
          userImg: values.assignedTo?.userImg as string,
        },  
      })

      taskNotification({
        projectId: projectId,
        type: 'create',
        text: `${user?.fullName} created a new task in ${project?.title}`
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

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-background border border-muted-foreground rounded-lg" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? date.toISOString() : undefined)}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedTo" 
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Assign</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const selectedMember = getMembers?.members?.find(member => member.userId === value);
                    field.onChange(selectedMember || null);
                  }}
                  value={field.value?.userId || ''} // Only the userId is used here for comparison
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a user">
                      {field.value ? (
                        <div className="flex gap-2 space-y-1 justify-start">
                          <Image
                            src={field.value.userImg}
                            alt={`${field.value.userName}'s image`}
                            height={1000}
                            width={1000}
                            className="w-5 h-5 rounded-full"
                          />
                          <p>{field.value.userName}</p>
                        </div>
                      ) : (
                        "Select a user"
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {getMembers?.members?.map((member) => (
                      <SelectItem key={member.userId} value={member.userId}>
                        <div className="flex gap-2 space-y-1 justify-start">
                          <Image
                            src={member.userImg}
                            alt={`${member.userName}'s image`}
                            height={1000}
                            width={1000}
                            className="w-5 h-5 rounded-full"
                          />
                          <p>{member.userName}</p>
                        </div>
                      </SelectItem>
                    ))}
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