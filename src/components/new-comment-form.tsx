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
import Image from "next/image"

const formSchema = z.object({
  comment: z.string().min(2).max(240),
})

export default function NewCommentForm({
    postId,
}: {
    postId: Id<'posts'>
}) {

    const { user } = useUser();
    const [comment, setComment] = useState<string>('');

    const newComment = useMutation(api.comments.newComment);
            
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await newComment({ 
            postId: postId,
            comment: values.comment,
            author: {
                userId: user?.id as string,
                userImg: user?.imageUrl as string,
                userName: user?.fullName as string,
            }
        });
    }

    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newComment({
                postId: postId,
                comment: comment,
                author: {
                    userId: user?.id as string,
                    userImg: user?.imageUrl as string,
                    userName: user?.fullName as string,
                }
            }),
            setComment('');
          }}  
          className="flex flex-col gap-2 items-end pt-4 w-full"
        >
          <div className="
              flex gap-2
              text-sm
              [&>textarea]:text-inherit
              [&>textarea]:resize-none
              w-full
          ">
            <Image 
              src={`${user?.imageUrl}`}
              alt={`${user?.fullName}'s image`}
              width={1000}
              height={1000}
              className="w-8 h-8 rounded-full"
            />
            <textarea 
              rows={3}
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="hide-scroll w-full border px-2 py-1.5 rounded-md placeholder:text-neutral-500 text-sm overflow-scroll bg-transparent"
            />

          </div>
        
          <div className="w-fit pt-4">
            <LoadingButton 
                isLoading={form.formState.isSubmitting}
                loadingText="Commenting"
            >Comment</LoadingButton>
          </div>

        </form>
      </>
    )
}