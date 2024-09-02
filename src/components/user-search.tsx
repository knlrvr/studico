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

import { Input } from "@/components/ui/input"
import { LoadingButton } from './loading-button'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect } from 'react'

const formSchema = z.object({
  query: z.string().min(0).max(50),
})

export default function UserSearchBar({
    query,
    setQuery
} : {
    query: string,
    setQuery: Dispatch<SetStateAction<string>>;
}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          query: query,
        },
    })
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setQuery(values.query)
    };

    useEffect(() => {
        form.setValue('query', query)
    }, [query, form])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value)
    };

    return (
        <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center w-full space-x-4">
        <Search className='w-4 h-4' />
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input 
                    {...field} 
                    type='text' 
                    placeholder='Search' 
                    onChange={handleInputChange}
                    className='w-full bg-transparent' 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
    </>
    )
}