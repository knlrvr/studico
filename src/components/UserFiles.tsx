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

import { AudioLines, Ellipsis, File, FileText, SquareArrowOutUpRight } from "lucide-react"

import ImagePreview from "./imagePreview"
import Link from "next/link"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import UserSearchBar from "./userSearch"
import { useState } from "react"
import DeleteUserFile from "./deleteUserFile"

export default function UserFiles() {

    const [query, setQuery] = useState<string>('');

    const files = useQuery(api.files.getFilesForUser, {
        query: '' || undefined,
    });

    const filteredFiles = files?.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <>
        <UserSearchBar query={query} setQuery={setQuery} />

        {filteredFiles?.length != undefined && filteredFiles?.length > 0 ? (
            <Table className="w-full mt-6">


            <TableCaption>
                {query ? 
                `Search Results (${filteredFiles.length})` 
                : `All Files (${filteredFiles.length})`}
            </TableCaption>


            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-xs">Preview</TableHead>
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-right text-xs">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {filteredFiles?.map((file) => {
                return (
                    <TableRow key={file._id} className="">
                        <TableCell 
                            className="font-medium text-neutral-500 text-center">
                                {file.type === "image/jpeg" && (
                                    <ImagePreview src={file?.fileUrl as string } />
                                )}
                                {file.type === 'image/png' && (
                                    <ImagePreview src={file?.fileUrl as string } />
                                )}
                                {file.type === 'image/webp' && (
                                    <ImagePreview src={file?.fileUrl as string } />
                                )}


                                {file.type === 'audio/aiff' && (
                                    <AudioLines className="w-16 h-16" />
                                )}
                                {file.type === 'audio/mpeg' && (
                                    <AudioLines className="w-16 h-16" />
                                )}
                                {file.type === 'application/pdf' && (
                                    <FileText className="w-16 h-16" />
                                )}
                                {file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                                    <File className="w-16 h-16" />
                                )}
                                {file.type === 'text/plain' && (
                                    <File className="w-16 h-16" />
                                )}
                        </TableCell>
                        <TableCell className="font-medium">{file.name}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Ellipsis className="w-5 h-5" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="space-y-1">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link
                                            href={`${file.fileUrl}`} 
                                            target="_blank" 
                                            className="w-full"
                                        >
                                            Open
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <DeleteUserFile
                                            fileId={file._id} 
                                            storageId={file.storageId}
                                        />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>                            
                        </TableCell>
                    </TableRow>
                    )
                })}

            </TableBody>
        </Table>
        ) : (
            <p className="text-neutral-500 flex w-full justify-center mt-8 text-sm">No files found.</p>
        )}
        </>
    )
}