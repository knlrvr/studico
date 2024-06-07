'use client'

import SendMessageForm from "./sendMessageForm";

import { Id } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import Image from "next/image";

export default function ProjectMessages({
    params
} : {
    params: {
        projectId: Id<"projects">,
    }
}) {

    const projectId = params?.projectId;

    const messages = useQuery(api.projects.getMessagesForProject, { projectId })

    return (
        <div className="flex flex-col justify-end">
            {/* <span className="text-lg"></span> */}
            
            <div className="flex flex-col min-h-[calc(100vh-350px)] sm:min-h-[calc(100vh-250px)] overflow-y-auto hide-scroll justify-end">
                <div className="flex flex-col space-y-3">                
                    {messages?.map((message: any) => {

                        function convertTime(ms: number): string {
                            const date = new Date();
                            return date.toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        }                   

                        return (
                            <div key={message._id} className="flex justify-start items-start gap-4">
                            <Image 
                                src={message.author.image}
                                alt={`${message.author.name}'s picture`}
                                width={1000}
                                height={1000}
                                className="w-10 h-10 rounded-full mt-1.5" />
                            <div className="flex-col">
                                <div className="flex gap-2">
                                    <span className="text-sm">{message.author.sentBy}</span>
                                    <span className="text-sm text-neutral-500">{convertTime(message._creationTime)}</span>
                                </div>
                                <p className="">{message.message}</p>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>

            <div className="my-6">
                <SendMessageForm params={{ projectId }} />
            </div>
        </div>
    )
}
