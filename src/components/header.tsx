'use client'

import { ModeToggle } from "./theme";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { HeaderActions } from "./header-actions";

export default function Header() {
    return (
        <div className="fixed p-4 border-b flex justify-between items-center w-full container mx-auto">

            <div className="flex items-center gap-4">
                <h1 className="font-extrabold tracking-widest italic text-lg">STUDICO</h1>
                
                {/* Pages / Conditional? */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Dashboard</Link>
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