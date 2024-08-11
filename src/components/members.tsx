
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
  
import CollabAction from "./collabAction";

// import { useState } from "react";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useProjectId } from "@/app/dashboard/projects/context";

export default function Members() {

    // const [isOpen, setIsOpen] = useState<boolean>(false);

    const projectId = useProjectId();

    const getProjectMembers = useQuery(api.projects.getProject, { projectId: projectId })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Collaborators</CardTitle>
                <CardDescription>Active members in this project.</CardDescription>
            </CardHeader>
            <CardContent className="flex -space-x-4">

               {getProjectMembers?.members?.map((member) => (
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
            </CardContent>
            <CardFooter className="w-full flex justify-end">
                <CollabAction />
            </CardFooter>
        </Card>
    )
}