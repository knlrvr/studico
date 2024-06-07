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
                <Button className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload New File</span>
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