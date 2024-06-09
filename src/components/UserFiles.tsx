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
import DeleteFile from "./deleteFile"
  
export default function UserFiles() {

    const files = useQuery(api.files.getFilesForUser)

    return (
        <Table className="w-full">
            <TableCaption>All Files</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-xs">Preview</TableHead>
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-right text-xs">Download</TableHead>
                    <TableHead className="text-right text-xs">Delete</TableHead>                    
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
                        <TableCell className="font-medium">{file.name}</TableCell>
                        <TableCell className="text-right">
                            <Button variant='ghost'>
                                <Link href={`${file.fileUrl}`} target="_blank">
                                    <span className="sr-only">Open</span>
                                    <CloudDownload className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
                                </Link>
                            </Button>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant='ghost'>
                                <span className="sr-only">Delete</span>
                                <DeleteFile fileId={file._id} storageId={file.storageId}/>
                            </Button>
                        </TableCell>
                    </TableRow>
                    )
                })}

            </TableBody>
        </Table>
    )
}