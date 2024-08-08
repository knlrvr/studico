'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useState } from "react";
import SendInviteForm from "./sendInviteForm";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useProjectId } from "@/app/dashboard/projects/context";
import { useUser } from "@clerk/nextjs";

export default function SendInvite() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { user } = useUser();
    const projectId = useProjectId();
    const projectOwner = useQuery(api.projects.getProject, { projectId: projectId })

    return (
        <>
        {projectOwner?.tokenIdentifier?.includes(user?.id as string) && (
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger>
                <Button className="flex flex-col items-start gap-4 h-fit w-36 text-xs">
                    <Plus className="w-4 h-4" />
                    <p className="tracking-wide">Invite</p>
                </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="mb-6">
                    <DialogTitle>Invite collaborators</DialogTitle>
                    <DialogDescription>
                        Enter the email of who you&apos;d like to invite to this project.
                    </DialogDescription>
                    </DialogHeader>

                    <SendInviteForm onSave={() => setIsOpen(false)} />
                </DialogContent>
            </Dialog>
        )}
        </>
    )
}