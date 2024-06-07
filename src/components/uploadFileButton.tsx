'use client'

import { Button } from "./ui/button"

import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"  
import { Upload } from "lucide-react"
import UploadFileForm from "./uploadFileForm"
import { useState } from "react"

export default function UploadFileButton() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button variant='action' className="fixed bottom-4 right-4 rounded-full h-fit p-4">
                    <Upload className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Keep track of your files for specific projects here.
                    </DialogDescription>

                    <UploadFileForm 
                        onUpload={() => setIsOpen(false)}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}