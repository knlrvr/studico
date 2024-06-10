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
import { Id } from "../../convex/_generated/dataModel"
import ImagePreview from "./imagePreview"

export default function RecentProjectFiles({
  params
} : {
    params: {
        projectId: Id<"projects">,
    }
}) {

  const projectId = params?.projectId;

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

        {files?.length != undefined && files?.length > 0 ? (
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
                      <TableCell className="font-medium text-right text-neutral-500">{file.name}</TableCell>
                  </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-neutral-500 text-sm italic">No recent files to display! Navigate to the files tab to upload one now!</p>
        )}
      </CardFooter>
    </Card>
  )
}
