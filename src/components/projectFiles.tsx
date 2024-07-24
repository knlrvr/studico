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

import { AudioLines, Ellipsis, File, FileText, SquareArrowOutUpRight} from "lucide-react"

import { Id } from "../../convex/_generated/dataModel"
import Link from "next/link"
import ImagePreview from "./imagePreview"
import DeleteFile from "./deleteFile"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"  

import SearchBar from "./projectSearch"
import { useState } from "react"

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

    const [query, setQuery] = useState<string>('');

    const filteredFiles = files?.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <>
        <SearchBar query={query} setQuery={setQuery} />
        
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
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Ellipsis className="w-5 h-5" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="space-y-2">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link
                                            href={`${file.fileUrl}`} 
                                            target="_blank" 
                                            className="w-full flex items-center gap-4"
                                        >
                                            <SquareArrowOutUpRight className="w-4 h-4 text-green-400" />
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
        ) : (
            <p className="text-neutral-500 flex w-full justify-center mt-8 text-sm">No files found.</p>
        )}
        </>
    )
}
