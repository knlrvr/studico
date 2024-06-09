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
import { AudioLines, CloudDownload, Ellipsis, File, FileText, Trash } from "lucide-react"
import ImagePreview from "./imagePreview"
import Link from "next/link"
import DeleteFile from "./deleteFile"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  

export default function UserFiles() {

    const files = useQuery(api.files.getFilesForUser)

    return (
        <Table className="w-full">
            <TableCaption>All Files</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-xs">Preview</TableHead>
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-right text-xs">Actions</TableHead>
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

                        {/* this should rly be a component */}
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Ellipsis className="w-5 h-5" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link
                                            href={`${file.fileUrl}`} 
                                            target="_blank" 
                                            className="w-full flex items-center gap-4"
                                        >
                                            <CloudDownload className="w-4 h-4 text-blue-400" />
                                            <p>Open</p>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="">
                                        <DeleteFile fileId={file._id} storageId={file.storageId}/>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>

                    </TableRow>
                    )
                })}

            </TableBody>
        </Table>
    )
}