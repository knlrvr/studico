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

export default function Header() {
    return (
        <div className="fixed p-4 border-b flex justify-between items-center w-full mx-auto bg-background">

            <div className="flex items-center gap-4">
                {/* <Link href="/" className="font-extrabold tracking-widest text-lg">STUDICO</Link> */}
                
                {/* Pages / Conditional? */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            {/* <Link href="/">Dashboard</Link> */}
                        </BreadcrumbItem>
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