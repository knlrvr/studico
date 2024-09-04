'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { LoadingButton } from "./loading-button"

import { Id } from "../../convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import {  useState } from "react"

const formSchema = z.object({
  body: z.string().min(2).max(1000),
})

export default function CreatePostForm({
    onSave
} : {
    onSave: () => void;
}) {

    const { user } = useUser();
    const [post, setPost] = useState<string>('');

    const createPost = useMutation(api.posts.createPost)
            
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            body: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createPost({ 
            body: values.body, 
            author: {
              userId: user?.fullName || '',
              userName: user?.imageUrl || '',
              userImg: user?.id || '',
            },
        });
    }

    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost({
              body: post,
              author: {
                userId: user?.fullName || '',
                userName: user?.imageUrl || '',
                userImg: user?.id || '',
              },
            })
            setPost('');
          }}  
          className="flex flex-col gap-2 items-end pt-4"
        >
          <div className="
              grid
              text-sm
              [&>textarea]:text-inherit
              [&>textarea]:resize-none
              w-full
          ">
            <textarea 
              rows={6}
              placeholder="Create a new post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              required
              className="hide-scroll w-full border px-2 py-1.5 rounded-md placeholder:text-neutral-500 text-sm overflow-scroll"
            />

          </div>
        
          <div className="w-fit pt-4">
            <LoadingButton 
                isLoading={form.formState.isSubmitting}
                loadingText="Posting"
            >Post</LoadingButton>
          </div>

        </form>
      </>
    )
}