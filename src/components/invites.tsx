import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

  } from "@/components/ui/dialog"
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UserRoundPlus } from "lucide-react";
import { Button } from "./ui/button";
import InviteAction from "./inviteAction";
import { useState } from "react";

export default function Invites() {

    const { user } = useUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    const userInvites = useQuery(api.invites.getInvitesForUser, {
        userEmail: userEmail ?? '',
    });

    const totalInvites = userInvites?.filter(invite => invite.status === 'pending');
    const hasNewInvites = !!totalInvites?.length;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog>
            <DialogTrigger className="flex justify-start w-fit">
                <Button variant='ghost' size='icon' className="relative">
                    <UserRoundPlus className="w-4 h-4" />
                    {hasNewInvites && (
                        <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs text-background pr-[0.1rem]">
                            {totalInvites.length}
                        </div>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>You&apos;ve been invited!</DialogTitle>
                <DialogDescription>
                    If you&apos;ve been invited to collaborate on a project, the invitation will display below.
                </DialogDescription>
                </DialogHeader>
                <InviteAction onSubmit={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}