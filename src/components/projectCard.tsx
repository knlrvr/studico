import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Doc } from '../../convex/_generated/dataModel'
import Image from "next/image";

export default function ProjectCard({ project }: { project: Doc<'projects'> }) {
    const displayedMembers = project.members?.slice(0, 5) || [];
    const remainingMembers = (project.members?.length || 0) - 5;

    return (
        <Link href={`/dashboard/projects/${project._id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                </CardHeader>

                <CardContent className="px-6 py-2">
                    <div className="flex -space-x-4 pb-4">
                        {displayedMembers.map((member) => (
                            <Image
                                key={member.userId}
                                src={`${member.userImg}`}
                                alt={`${member.userName}'s image`}
                                width={1000}
                                height={1000}
                                className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d]"
                            />
                        ))}
                        {remainingMembers > 0 && (
                            <div className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d] bg-neutral-200 dark:bg-[#222] flex items-center justify-center text-sm font-medium text-muted-foreground">
                                +{remainingMembers}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}