'use client'

import SendMessageForm from "./sendMessageForm";

import { Id } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ProjectMessages({
    params
} : {
    params: {
        projectId: Id<"projects">,
    }
}) {

    const projectId = params?.projectId;
    console.log('Id from params = ', projectId)

    const messages = useQuery(api.projects.getMessagesForProject, { projectId })

    return (
        <div className="flex flex-col justify-end">
            {/* <span className="text-lg"></span> */}
            
            <div className="flex flex-col h-[calc(100vh-300px)] sm:h-[calc(100vh-250px)] overflow-y-auto hide-scroll">
                <div className="flex flex-col justify-end flex-grow space-y-3">                
                    {messages?.map((message: any) => (
                        <div key={message._id} className="flex justify-start items-start gap-4">
                            <div className="min-w-10 min-h-10 rounded-full bg-neutral-500 mt-1.5"></div>
                            <div className="flex-col">
                                <span className="text-sm text-neutral-500">firstName LastName</span>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-6">
                <SendMessageForm params={{ projectId }} />
            </div>
        </div>
    )
}
