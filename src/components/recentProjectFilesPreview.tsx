import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table"

import { 
  AudioLines, 
  File, 
  FileText
} from "lucide-react"

import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import ImagePreview from "./imagePreview"
import { useProjectId } from "@/app/dashboard/projects/context"

export default function RecentProjectFilesPreview() {

  const projectId = useProjectId();

  const files = useQuery(api.files.getRecentFilesForProject, {
    projectId,
  })

  return (
    <Card className="flex flex-col justify-start items-start">
      <CardHeader className="pb-3">
        <CardTitle>Recent Files</CardTitle>
        <CardDescription className="">
          Recently uploaded files for this project. Open the files tab to view, download, or delete these files.
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full">

        {files?.length != undefined && files?.length > 0 && (
          <Table className="w-full">
            <TableCaption>Recent Files</TableCaption>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px] text-xs">Preview</TableHead>
                      <TableHead className="text-xs text-right">Name</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {files?.map((file) => {
                  return (
                  <TableRow key={file._id} className="">
                      <TableCell 
                          className="font-medium text-neutral-500 text-center w-12 h-12">
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
                      <TableCell className="font-medium text-right text-muted-foreground">{file.name}</TableCell>
                  </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        )}
      </CardFooter>
    </Card>
  )
}