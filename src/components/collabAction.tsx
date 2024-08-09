'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "./ui/button"
import { LogOut, Plus } from "lucide-react"
import { useState } from "react";
import SendInviteForm from "./sendInviteForm";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useProjectId } from "@/app/dashboard/projects/context";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation"
import { useToast } from "./ui/use-toast"

export default function CollabAction() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { user } = useUser();
    const projectId = useProjectId();
    const router = useRouter();
    const { toast } = useToast();

    const projectOwner = useQuery(api.projects.getProject, { projectId: projectId })

    const leaveProject = useMutation(api.invites.leaveProject);

    return (
        <>
        {projectOwner?.tokenIdentifier?.includes(user?.id as string) && (
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger className="">
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
        {!projectOwner?.tokenIdentifier?.includes(user?.id as string) && (
            <AlertDialog>
                <AlertDialogTrigger className="">
                    <Button className="flex flex-col items-start gap-4 h-fit w-36 text-xs bg-red-500 hover:bg-red-600">
                        <LogOut className="w-4 h-4 rotate-180" />
                        <p className="tracking-wide">Leave Project</p>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. You will no longer be able to access this project unless invited again. 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        leaveProject({ 
                            projectId: projectId,
                        })
                        router.push('/dashboard');
                        toast({
                            variant: 'success',
                            description: `You've successfully left this project and have been redirected to your dashboard.`
                        })
                    }}>
                        Leave Project
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>  
        )}
        </>
    )
}