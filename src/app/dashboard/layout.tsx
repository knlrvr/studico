'use client'

import Header from "@/components/header";
import SideNav from "@/components/sidenav";
import useStoreUserEffect from "@/useStoreUserEffect";
import { useSession } from "@clerk/nextjs";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode,
}> ) {

    const isSignedIn = useSession();
    const userId = useStoreUserEffect();

    return (
        <>
        {userId && isSignedIn && (
            <div className="flex">
                <SideNav />
                <Header />
                <div className="w-full sm:pl-48 bg-white dark:bg-[#111] dark:bg-opacity-40 min-h-screen">
                    {children}
                </div>
            </div>
        )}
        </>
    )
}
