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
import UploadFileToProject from "./uploadFileToProject"
import { useProjectId } from "@/app/dashboard/projects/context"

export default function UploadFileProjectButton() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const projectId = useProjectId();

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button className="flex flex-col items-start gap-4 h-fit w-36">
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

                    <UploadFileToProject 
                        params={{ projectId }}
                        onUpload={() => setIsOpen(false)}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}