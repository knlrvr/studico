'use client'

import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Id } from "../../convex/_generated/dataModel";

export default function InviteAction({
    onSubmit
}: {
    onSubmit: () => void;
}) {

    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const userInvites = useQuery(api.invites.getInvitesForUser, {
        userEmail: userEmail ?? '',
    })

    const pendingInvites = userInvites?.filter(invite => invite.status === 'pending')

    const acceptInvite = useMutation(api.invites.acceptProjectInvite);
    const deleteInvite = useMutation(api.invites.deleteProjectInvite);

    // accept before delete
    const handleAcceptInvite = async (inviteId: Id<'invites'>) => {
        await acceptInvite({ inviteId });
        await deleteInvite({ inviteId });
    }

    const declineInvite = useMutation(api.invites.declineProjectInvite);

    return (
        <div className="flex flex-col space-y-4">
            {pendingInvites?.map((invite) => (
                <div key={invite._id}
                    className="flex justify-between items-center"
                >   
                    <p className="font-medium">{invite.projectName}</p>
                    <div className="flex gap-8">
                        <Button variant='ghost'
                            className="bg-green-500 bg-opacity-20"
                            onClick={() => {
                                handleAcceptInvite(invite._id);
                                
                            }}
                        ><Check className="w-4 h-4" />
                        </Button>
                        <Button variant='ghost'
                            className="bg-red-500 bg-opacity-20"
                            onClick={() => {
                                declineInvite({ inviteId: invite._id })
                            }}
                        ><X className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}