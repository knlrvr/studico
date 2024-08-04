'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useMutation } from "convex/react"

import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"

export default function DeleteFile({
    fileId,
    storageId,
    projectId,
    projectName,
} : {
    fileId: Id<"files">,
    storageId: Id<"_storage">,
    projectId: string,
    projectName: string,
}) {

    const deleteFile = useMutation(api.files.deleteFile)
    const fileNotification = useMutation(api.notifications.createNotification)

    const { user } = useUser();

    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full flex items-center px-2 py-1 text-sm rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-100">
                Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this file from Studico 
                    and will no longer be accessible from within your account.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => {
                        deleteFile({
                            storageId,
                            fileId,
                        });
                        fileNotification({
                            projectId: projectId,
                            type: 'delete',
                            text: `${user?.fullName} deleted a file in ${projectName}`
                        })
                    }}
                >
                    Delete File
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

