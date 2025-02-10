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

import { AudioLines, Ellipsis, File, FileText } from "lucide-react"

import ImagePreview from "./image-preview"
import Link from "next/link"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import UserSearchBar from "./user-search"
import { useState } from "react"
import DeleteUserFile from "./delete-user-file"

export default function UserFiles() {

    const [query, setQuery] = useState<string>('');

    const files = useQuery(api.files.getFilesForUser, {
        query: '',
    });

    const filteredFiles = files?.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));

    const copyLink = (copiedText: string): void => {
        navigator.clipboard.writeText(copiedText);
    }

    return (
        <>
        {filteredFiles?.length != undefined && filteredFiles?.length > 0 && (
            <UserSearchBar query={query} setQuery={setQuery} />
        )}

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
                            className=" text-neutral-500">
                                {file.type === "image" && (
                                    <ImagePreview src={file?.fileUrl as string } />
                                )}
                                {file.type === "image/jpeg" && (
                                    <ImagePreview src={file?.fileUrl as string } />
                                )}
                                {file.type === 'image/png' && (
                                    <ImagePreview src={file?.fileUrl as string } />
                                )}
                                {file.type === 'image/webp' && (
                                    <ImagePreview src={file?.fileUrl as string } />
                                )}
                                {file.type === 'image/svg+xml' && (
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
                                    <DropdownMenuItem>
                                        <button
                                            onClick={() => {
                                                copyLink(file.fileUrl as string)
                                            }}
                                        >
                                            Copy Link
                                        </button>
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
            <p className="text-neutral-500 flex w-full justify-start text-sm">No files found. Upload one now!</p>
        )}
        </>
    )
}