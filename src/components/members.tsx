
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SendInviteForm from "./sendInvite"  
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useProjectId } from "@/app/dashboard/projects/context";
import { useUser } from "@clerk/nextjs";

export default function Members() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const projectId = useProjectId();
    const {user} = useUser();

    const getProjectMembers = useQuery(api.projects.getProject, { projectId: projectId })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Collaborators</CardTitle>
                <CardDescription>Active members in this project.</CardDescription>
            </CardHeader>
            <CardContent className="flex -space-x-4">

                {getProjectMembers?.members?.map((member) => (
                    <Image 
                        key={member.userId}
                        src={member.userImg as string}
                        alt=''
                        width={1000}
                        height={1000}
                        className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d]"
                    />
                ))}

            </CardContent>
            <CardFooter className="flex justify-end">
                <SendInviteForm onSave={() => setIsOpen(false)} />
            </CardFooter>
        </Card>
    )
}