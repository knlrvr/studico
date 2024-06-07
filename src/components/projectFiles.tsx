'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { AudioLines, CloudDownload, File, FileImage, FileText, Trash } from "lucide-react"
import { Id } from "../../convex/_generated/dataModel"
import { Button } from "./ui/button"
import Link from "next/link"
import ImagePreview from "./imagePreview"
  
export default function ProjectFiles({
    params,
}: {
    params: {
        projectId: Id<'projects'>
    }
}) {

    const files = useQuery(api.files.getFilesForProject, { 
        projectId: params.projectId, 
    })

    return (
        <Table>
            <TableCaption>All Files</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="collapse sm:visible">Date</TableHead>
                    {/* <TableHead>Size</TableHead> */}
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {files?.map((file) => {
                    return (
                    <TableRow key={file._id} className="">
                        <TableCell className="font-medium text-neutral-500">
                        {file.type === "image/jpeg" && (
                            <ImagePreview storageId={`${file.storageId}`} />
                        )}
                        {file.type === 'image/png' && (
                            <ImagePreview storageId={`${file.storageId}`} />
                        )}
                        {file.type === 'audio/aiff' && (
                            <AudioLines className="w-8 h-8" />
                        )}
                        {file.type === 'audio/mpeg' && (
                            <AudioLines className="w-8 h-8" />
                        )}
                        {file.type === 'application/pdf' && (
                            <FileText className="w-8 h-8" />
                        )}
                        {file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                            <File className="w-8 h-8" />
                        )}
                        {file.type === 'text/plain' && (
                            <File className="w-8 h-8" />
                        )}      
                        </TableCell>
                        <TableCell>{file.name}</TableCell>
                        <TableCell className="collapse sm:visible text-neutral-500">
                        {new Date(file._creationTime).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        </TableCell>
                        {/* <TableCell>size?</TableCell> */}
                        <TableCell className="text-right flex items-center justify-end gap-8">
                            <Button variant='ghost'>
                                <CloudDownload className="w-5 h-5 text-blue-500" />
                            </Button>


                            <Trash className="w-5 h-5 text-red-500" />
                        </TableCell>
                    </TableRow>
                    )
                })}

            </TableBody>
        </Table>
    )
}