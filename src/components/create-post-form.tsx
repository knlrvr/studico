'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { LoadingButton } from "./loading-button"
import { Id } from "../../convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  body: z.string().min(2).max(1000),
  file: z.instanceof(File).optional(),
})

export default function CreatePostForm({
    onSave
} : {
    onSave: () => void;
}) {
    const { user } = useUser();
    const [isUploading, setIsUploading] = useState(false);

    const createPost = useMutation(api.posts.createPost);
    const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
    const updatePostImage = useMutation(api.posts.updatePostImage);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            body: "",
            file: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsUploading(true);
        try {
            // First, create the post without the image
            const postId = await createPost({ 
                body: values.body, 
                author: {
                    userId: user?.id || '',
                    userName: user?.fullName || '',
                    userImg: user?.imageUrl || '',
                },
            });

            // If there's a file, upload it and update the post
            if (values.file) {
                const uploadUrl = await generateUploadUrl();

                const result = await fetch(uploadUrl, { 
                    method: "POST",
                    headers: { "Content-Type": values.file.type },
                    body: values.file,
                });

                const { storageId } = await result.json();
                
                // Update the post with the image storageId
                await updatePostImage({
                    postId,
                    storageId: storageId as Id<"_storage">,
                    name: values.file.name,
                });
            }

            form.reset();
            onSave();
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 items-end pt-4">
            <div className="grid text-sm w-full">
                <textarea 
                    {...form.register("body")}
                    rows={6}
                    placeholder="Create a new post"
                    className="hide-scroll w-full border px-2 py-1.5 rounded-md placeholder:text-neutral-500 text-sm overflow-scroll bg-transparent resize-none"
                />
                {form.formState.errors.body && (
                    <p className="text-red-500">{form.formState.errors.body.message}</p>
                )}
            </div>

            <div className="w-full">
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            form.setValue("file", file);
                        }
                    }}
                />
            </div>
        
            <div className="w-fit pt-4">
                <LoadingButton 
                    isLoading={isUploading || form.formState.isSubmitting}
                    loadingText="Posting"
                >Post</LoadingButton>
            </div>
        </form>
    )
}