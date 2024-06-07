'use client'

import { Button } from "./ui/button"

import { api } from "../../convex/_generated/api"
import { useMutation, useQuery } from "convex/react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"  
import { Upload } from "lucide-react"
import { useState } from "react"
import { Id } from "../../convex/_generated/dataModel"
import UploadFileToProject from "./uploadFileToProject"

export default function UploadFileProjectButton({ projectId }: { projectId: Id<'projects'> }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const project = { projectId: projectId }

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button variant='action' className="z-[10] fixed bottom-4 right-4 rounded-full h-fit p-4">
                    <Upload className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Keep track of your files for specific projects here.
                    </DialogDescription>

                    <UploadFileToProject 
                        params={{ projectId }}
                        onUpload={() => setIsOpen(false)}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}