import Header from "@/components/header";
import SideNav from "@/components/sidenav";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}> ) {
    return (
        <div className="flex">
            <SideNav />
            <Header />

            <div className="w-full sm:pl-56 bg-neutral-50 dark:bg-[#111] min-h-screen">{children}</div>
        </div>
    )
}