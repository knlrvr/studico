'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Ellipsis } from "lucide-react"
import { Id } from "../../convex/_generated/dataModel"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

export function PostActions({
    id
} : {
    id: string,
}) {

    const deletePost = useMutation(api.posts.deletePost)
    const { toast } = useToast();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-fit h-fit">
                <Ellipsis className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button 
                        onClick={() => {
                            deletePost({
                                postId: id as Id<'posts'>,
                            });
                            toast({
                                description: "Your post has been deleted!",
                            });
                            router.push('/dashboard/feed')
                        }}
                    >
                        Delete Post
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}