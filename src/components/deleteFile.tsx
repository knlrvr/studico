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
  

import { Trash } from "lucide-react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"

export default function DeleteFile({
    fileId,
    storageId,
} : {
    fileId: Id<"files">,
    storageId: Id<"_storage">,
}) {

    const deleteFile = useMutation(api.files.deleteFile)

    return (
        <AlertDialog>
            <AlertDialogTrigger className="ml-0.5 w-full flex items-center gap-4 p-1.5 text-sm rounded-sm hover:bg-neutral-100 transition-colors duration-100">
                <Trash className="w-4 h-4 text-red-400" /> 
                <p>Delete</p>
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
                    }}
                >
                    Delete File
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

