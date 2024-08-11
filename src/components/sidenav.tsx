'use client'

import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Bell, Box, Folder, LayoutDashboard, Menu, MessageSquare, Search, Settings, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Component() {

  const pathname = usePathname();

  return (
    <header className="fixed z-[20] sm:border-r bg-background sm:min-h-screen">
      <div className="p-4">
        <Link href="/dashboard" className="w-fit">
          <span className="hidden sm:inline-block font-extrabold tracking-wider text-xl bg-primary w-fit p-2 rounded-md text-background">Studico</span>
        </Link>
        <nav className="hidden mt-9 items-start gap-2 text-sm font-medium sm:flex flex-col w-40">
          <Link
            href="/dashboard"
            className={cn(
                "p-2 rounded-lg w-full flex items-center gap-2 transition-colors duration-150 hover:bg-neutral-100 dark:hover:text-background",
                {
                    'bg-neutral-200 hover:bg-neutral-200 dark:bg-[#222] dark:hover:text-white': pathname.endsWith('/dashboard') || pathname.includes('/projects/')
                }
                )}
            prefetch={false}
          >
            <Box className="w-5 h-5" />
            <span>Projects</span>
          </Link>
          <Link
            href="/dashboard/files"
            className={cn(
              "p-2 rounded-lg w-full flex items-center gap-2 transition-colors duration-150 hover:bg-neutral-100 dark:hover:text-background",
              {
                    'bg-neutral-200 hover:bg-neutral-200 dark:bg-[#222] cursor-default dark:hover:text-white': pathname.endsWith('/dashboard/files')
                }
                )}            
                prefetch={false}
          >
            <Folder className="w-5 h-5" />
            <span>Files</span>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden -ml-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden z-[99]" suppressHydrationWarning>
            <div className="grid gap-4 p-6">
              <Link href="/dashboard" className="w-fit">
                <span className="font-extrabold tracking-wider text-xl bg-primary w-fit p-2 rounded-md text-background">Studico</span>
              </Link>
              <nav className="grid gap-8 mt-10">
                <Link href="/dashboard" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <Box className="w-5 h-5" />
                  <span>Projects</span> 
                </Link>
                <Link href="/dashboard/files" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <Folder className="w-5 h-5" />
                  <span>Files</span>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}