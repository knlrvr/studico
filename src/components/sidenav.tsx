'use client'

import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Bell, Folder, LayoutDashboard, Menu, MessageSquare, Search, Settings, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Component() {

  const pathname = usePathname();

  return (
    <header className="fixed z-[20] sm:border-r bg-background sm:min-h-screen">
      <div className="p-4">
        <Link href="/dashboard" className="">
          <span className="hidden sm:flex font-extrabold tracking-wider text-xl mt-2 ml-2">Studico</span>
        </Link>
        <nav className="hidden mt-[2.75rem] items-start gap-2 text-sm font-medium sm:flex flex-col w-40">
          <Link
            href="/dashboard"
            className={cn(
                "p-2 rounded-lg w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150",
                {
                    'bg-neutral-200 dark:bg-[#222] hover:text-black dark:hover:text-white': pathname.endsWith('/dashboard') || pathname.includes('/projects/')
                }
                )}
            prefetch={false}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Projects</span>
          </Link>
          <Link
            href="/dashboard/files"
            className={cn(
                "p-2 rounded-lg w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150",
                {
                    'bg-neutral-200 dark:bg-[#222] hover:text-black dark:hover:text-white': pathname.endsWith('/dashboard/files')
                }
                )}            
                prefetch={false}
          >
            <Folder className="w-5 h-5" />
            <span>Files</span>
          </Link>
          <Link
            href="/dashboard/notifications"
            className={cn(
                "p-2 rounded-lg w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150",
                {
                    'bg-neutral-200 dark:bg-[#222] hover:text-black dark:hover:text-white' : pathname.endsWith('/dashboard/notifications')
                }
                )}            
                prefetch={false}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </Link>
          <Link
            href="/dashboard/messages"
            className={cn(
                "p-2 rounded-lg w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150",
                {
                    'bg-neutral-200 dark:bg-[#222] hover:text-black dark:hover:text-white': pathname.endsWith('/dashboard/messages')
                }
                )}            
                prefetch={false}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </Link>
          <Link
            href="/dashboard/search"
            className={cn(
                "p-2 rounded-lg w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150",
                {
                    'bg-neutral-200 dark:bg-[#222] hover:text-black dark:hover:text-white': pathname.endsWith('/dashboard/search')
                }
                )}            
                prefetch={false}
          >
            <Search className="w-5 h-5" />
            <span>Search All</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className={cn(
                "p-2 rounded-lg w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150",
                {
                    'bg-neutral-200 dark:bg-[#222] hover:text-black dark:hover:text-white': pathname.endsWith('/dashboard/profile')
                }
                )}            
                prefetch={false}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
                "p-2 rounded-lg w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150",
                {
                    'bg-neutral-200 dark:bg-[#222] hover:text-black dark:hover:text-white': pathname.endsWith('/dashboard/settings')
                }
                )}            
                prefetch={false}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden -ml-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden" suppressHydrationWarning>
            <div className="grid gap-4 p-6">
              <Link href="/dashboard" className="flex items-center gap-2"

                // i hate this
                // onClick={() => {
                //     document.querySelector('[data-[state=open]]')?.dispatchEvent(new Event("click"));
                // }}
              >
                <span className="text-lg font-extrabold tracking-wide">Studico</span>
              </Link>
              <nav className="grid gap-8 mt-10">
                <Link href="/dashboard" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Projects</span>
                </Link>
                <Link href="/dashboard/files" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <Folder className="w-5 h-5" />
                  <span>Files</span>
                </Link>
                <Link href="/dashboard/notifications" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </Link>
                <Link href="/dashboard/messages" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <MessageSquare className="w-5 h-5" />
                  <span>Messages</span>
                </Link>
                <Link href="/dashboard/search" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <Search className="w-5 h-5" />
                  <span>Search All</span>
                </Link>
                <Link href="/dashboard/profile" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-4 text-lg font-medium" prefetch={false}>
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}