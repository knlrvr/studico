'use client'

import { Button } from "./ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"  
import { ArrowUpFromLine } from "lucide-react"
import { useState } from "react"

import UploadFileToUser from "./uploadFileToUser"

export default function UploadFileUserButton() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
            <Button variant='outline' className="flex flex-col items-start gap-4 h-fit w-36">
                    <ArrowUpFromLine className="w-5 h-5" />
                    <p className="text-xs tracking-wide">Upload</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Keep track of your files for specific projects here.
                    </DialogDescription>

                    <UploadFileToUser
                        onUpload={() => setIsOpen(false)}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}