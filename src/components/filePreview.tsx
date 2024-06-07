import { AudioLines, File, FileImage } from "lucide-react";
import { Card } from "./ui/card";


export default function FilePreview({ 
    name, 
    type,
    date 
}: {
    name: string
    type: string,
    date: any,
}) {
    return (
        <div className="w-full h-fit flex flex-col space-y-2 justify-between">
            <div className="flex w-full justify-center">

                {type === "image/jpeg" && (
                    <FileImage className="w-12 h-12" />
                )}
                {type === 'image/png' && (
                    <FileImage className="w-12 h-12" />
                )}
                {type === 'audio/mpeg' && (
                    <AudioLines className="w-12 h-12" />
                )}
                {type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                    <File className="w-12 h-12" />
                )}
                {type === 'application/pdf' && (
                    <File className="w-12 h-12" />
                )}
                {type === 'text/plain' && (
                    <File className="w-12 h-12" />
                )}

            </div>
            <p className="flex w-full justify-center text-center text-sm font-light">{name}</p>
            <span className="mt-1 text-neutral-500 text-center text-xs">
                {new Date(date).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </span>
        </div>
    )
}