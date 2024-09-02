import React from 'react';
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import CollabAction from "./collab-action";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useProjectId } from "@/app/dashboard/projects/context";

export default function Members() {
    const projectId = useProjectId();
    const getProjectMembers = useQuery(api.projects.getProject, { projectId: projectId });

    const displayedMembers = getProjectMembers?.members?.slice(0, 5) || [];
    const remainingMembers = (getProjectMembers?.members?.length || 0) - 5;

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Collaborators</CardTitle>
                <CardDescription>Active members in this project.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-y-1 -space-x-4">
                {displayedMembers.map((member) => (
                    <TooltipProvider key={member.userId}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Image 
                                    src={member.userImg as string}
                                    alt=''
                                    width={1000}
                                    height={1000}
                                    className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d]"
                                />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{member.userName}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
                {remainingMembers > 0 && (
                    <Sheet>
                        <SheetTrigger>
                            <div className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d] bg-neutral-200 dark:bg-[#222] flex items-center justify-center text-sm font-medium text-muted-foreground">
                                +{remainingMembers}
                            </div>
                        </SheetTrigger>
                        <SheetContent className='overflow-scroll hide-scroll'>
                            <SheetHeader>
                                <SheetTitle>Collaborators</SheetTitle>
                                <SheetDescription>
                                    All collaborators in this project.
                                </SheetDescription>
                            </SheetHeader>
                            <ul className='space-y-4 mt-8'>
                                {getProjectMembers?.members?.map((member) => (
                                    <li key={member.userId}
                                        className='flex items-center gap-4'
                                    >
                                        <Image 
                                            src={member.userImg as string}
                                            alt=''
                                            width={1000}
                                            height={1000}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <p className='text-sm text-muted-foreground'>{member.userName}</p>
                                    </li>
                                ))}
                            </ul>
                        </SheetContent>
                    </Sheet>
                )}
            </CardContent>
            <CardFooter className="w-full flex justify-end">
                <CollabAction />
            </CardFooter>
        </Card>
    )
}