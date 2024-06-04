'use client3'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Skeleton } from "./ui/skeleton";


export function HeaderActions() {
    return (
        <div className="flex items-center gap-4">
            <Unauthenticated>
                <SignInButton />
            </Unauthenticated>

            <Authenticated>
                <UserButton />
            </Authenticated>

            <AuthLoading>
                <Skeleton className="bg-neutral-400 h-7 w-7 rounded-full"></Skeleton>
            </AuthLoading>

        </div>
    )
}