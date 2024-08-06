import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
  
import { 
    AudioLines, 
    File, 
    FileText, 
    Images
} from "lucide-react"
  
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import ImagePreview from "./imagePreview"
import { formatFileName } from "@/lib/utils"
import Link from "next/link"
  
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
        <div className="mt-8">
  

            {files?.length !== undefined && files?.length > 0 && (
                <>
                <span className="text-sm">Recently uploaded files &mdash;</span>
                <div className="mt-4 mb-8 grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 max-w-2xl">
                    {files?.map((file) => (
                        <>
                        <Link key={file._id} href={file.fileUrl as string} target="_blank">
                            <Card 
                                className="border-none rounded-lg shadow-none flex flex-col justify-between hover:bg-neutral-100 dark:hover:bg-[#222] transition-colors duration-150 py-2"
                            >
                                <CardContent className="flex justify-center">

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
                                        <div className="w-[4rem] h-[4rem]">
                                            <AudioLines className="w-16 h-16" />
                                        </div>
                                    )}
                                    {file.type === 'audio/mpeg' && (
                                        <div className="w-[4rem] h-[4rem]">
                                            <AudioLines className="w-16 h-16" />
                                        </div>
                                    )}
                                    {file.type === 'application/pdf' && (
                                        <div className="w-[4rem] h-[4rem]">
                                            <FileText className="w-16 h-16" />
                                        </div>
                                    )}
                                    {file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                                        <div className="w-[4rem] h-[4rem]">
                                            <File className="w-16 h-16" />
                                        </div>
                                    )}
                                    {file.type === 'text/plain' && (
                                        <div className="w-[4rem] h-[4rem]">
                                            <File className="w-16 h-16" />
                                        </div>
                                    )}  
                                </CardContent>
                                <CardFooter className="py-1 text-sm flex justify-center">{formatFileName(file.name)}</CardFooter>
                            </Card>
                        </Link>
                        </>
                    ))}
                </div>
                </>
            )}
        </div>
    )
}