import Header from "@/components/header";
import SideNav from "@/components/sidenav";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}> ) {
    return (
        <div className="flex">
            <SideNav />
            <Header />

            <div className="w-full sm:pl-48 bg-white dark:bg-[#111] dark:bg-opacity-40 min-h-screen">{children}</div>
        </div>
    )
}