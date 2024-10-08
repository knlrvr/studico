'use client'

import SendMessageForm from "./send-message-form";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Image from "next/image";
import { useRef, useEffect, useState } from 'react';
import { messageTime } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { MessageActions } from "./message-actions";
import { useProjectId } from "@/app/dashboard/projects/context";

export default function ProjectMessages() {
    const projectId = useProjectId();
    const messages = useQuery(api.projects.getMessagesForProject, { projectId });
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const { user } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            if (messageContainerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
                // Check if the user is within 50px of the bottom
                const isNearBottom = scrollHeight - scrollTop - clientHeight <= 50;
                setIsUserScrolling(!isNearBottom);
            }
        };

        const currentRef = messageContainerRef.current;
        currentRef?.addEventListener('scroll', handleScroll);
        return () => {
            currentRef?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (messageContainerRef.current && !isUserScrolling) {

            // Scroll to bottom when new messages arrive
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, isUserScrolling]);

    return (
        <div className="flex flex-col justify-end h-full mt-4">
            <div 
                className="flex flex-col h-[calc(100vh-250px)] sm:h-[calc(100vh-240px)] overflow-y-auto"
                ref={messageContainerRef}
            >
                <div className="flex flex-col space-y-3 h-full hide-scroll">
                    {messages?.map((message: any) => (
                        <div key={message._id} className="flex justify-between last:pb-8">
                            <div className="flex justify-start items-start gap-3">
                                <Image 
                                    src={message.author.image}
                                    alt={`${message.author.name}'s picture`}
                                    width={1000}
                                    height={1000}
                                    className="w-8 h-8 rounded-full mt-1" 
                                />
                                <div className="flex-col">
                                    <div className="flex gap-2">
                                        <span className="text-sm">{message.author.sentBy}</span>
                                        <span className="text-sm text-neutral-500">
                                            {messageTime(message._creationTime)}
                                        </span>
                                    </div>
                                    <pre className="text-sm mt-1 font-sans whitespace-pre-wrap break-words">{message.message}</pre>
                                </div>
                            </div>

                            {message.author.tokenIdentifier.includes(user?.id) && (
                                <div className="mt-0.5">
                                    <MessageActions id={message._id} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <SendMessageForm params={{ projectId }} />
            </div>
        </div>
    );
}