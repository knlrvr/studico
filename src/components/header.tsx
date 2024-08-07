'use client'

import { ModeToggle } from "./theme";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
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
                <Breadcrumb>
                    <BreadcrumbList>

                        {pathname.includes('projects/') ? (
                            <>
                                <BreadcrumbLink href='/dashboard' className="hidden sm:inline-flex">Projects</BreadcrumbLink>
                                <BreadcrumbSeparator className="hidden sm:inline-flex" />
                            </>
                        ) : (
                            <BreadcrumbItem>
                                <OrganizationSwitcher />
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