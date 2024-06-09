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
import { AudioLines, CloudDownload, File, FileText, Trash } from "lucide-react"
import ImagePreview from "./imagePreview"
import { Button } from "./ui/button"
import Link from "next/link"
  
export default function UserFiles() {

    const files = useQuery(api.files.getFilesForUser)

    return (
        <Table>
            <TableCaption>All Files</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Name</TableHead>

                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {files?.map((file) => {
                    return (
                    <TableRow key={file._id} className="">
                        <TableCell 
                            className="font-medium text-neutral-500 text-center">
                            {file.type === "image/jpeg" && (
                                <ImagePreview src={file?.fileUrl as string } />
                            )}
                            {file.type === 'image/png' && (
                                <ImagePreview src={file?.fileUrl as string} />
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
                        {/* <TableCell className="collapse sm:visible text-neutral-500">
                        {new Date(file._creationTime).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        </TableCell> */}
                        <TableCell className="text-right flex items-center justify-end gap-8">
                            <Button variant='ghost'>
                                <Link href={`${file.fileUrl}`} target="_blank">
                                    <CloudDownload className="w-5 h-5 text-blue-500" />
                                </Link>
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