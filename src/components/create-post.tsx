import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
import CreatePostForm from "./create-post-form"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarImage } from "./ui/avatar"
import { useState } from "react"
  
  export function CreatePost() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { user } = useUser();

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="my-8 py-8 w-full flex items-center justify-start gap-4">
            <Image
                src={`${user?.imageUrl}`}
                alt={`${user?.fullName}'s image`}
                width={1000}
                height={1000}
                className="w-6 h-6 rounded-full"
            />
            <span className="text-muted-foreground">Share something with the community...</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogTitle className="sr-only">Create Post</DialogTitle>
          <DialogDescription className="sr-only">write your post below.</DialogDescription>
          <DialogHeader>
            <div className="flex items-center gap-2">
                <Avatar className="">
                    <AvatarImage 
                        src={user?.imageUrl} 
                        alt={`${user?.fullName}'s picture`} 
                        className="w-8 h-8 rounded-full"
                    />
                </Avatar>
                <div className="flex flex-col -mt-2">
                  <span className="text-sm">{user?.fullName}</span>
                  <span className="text-xs text-muted-foreground">Everyone will see this</span>
                </div>
            </div>
            <CreatePostForm onSave={() => setIsOpen(!isOpen)} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
  