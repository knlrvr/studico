'use client'

import { ModeToggle } from "./theme";

import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { HeaderActions } from "./header-actions";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Header() {

    let pathname = usePathname();
    return (
        <div className="z-[10] fixed p-4 border-b flex justify-between items-center w-full mx-auto bg-background">

            <div className="flex items-center gap-4 ml-12 sm:ml-48">
                {/* <Link href="/" className="font-extrabold tracking-widest text-lg">STUDICO</Link> */}
                
                {/* Pages / Conditional? */}
                <Breadcrumb>
                    <BreadcrumbList>

                        {pathname.includes('projects') ? (
                            <div></div>
                        ) : (
                            <BreadcrumbItem>
                                <OrganizationSwitcher />
                            </BreadcrumbItem>
                        )}

                        {pathname.includes('projects') && (
                        <BreadcrumbItem className="hidden sm:inline-flex">
                            <p>Active Project</p>
                        </BreadcrumbItem>
                        )}

                    </BreadcrumbList>
                </Breadcrumb>
                
            </div>

            <div className="flex items-center gap-4">
                <ModeToggle />
                <HeaderActions />
            </div>
        </div>
    )
}