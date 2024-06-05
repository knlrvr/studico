'use client'

import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Bell, Folder, LayoutDashboard, Menu, Settings, User } from "lucide-react"

export default function Component() {
  return (
    <header className="fixed z-[10] sm:border-r bg-background sm:min-h-screen">
      <div className="p-4">
        <Link href="#" className="">
          <span className="hidden sm:flex font-extrabold tracking-wider text-xl">Studico</span>
        </Link>
        <nav className="hidden mt-12 items-start gap-8 text-sm font-medium sm:flex flex-col w-48">
          <Link
            href="/dashboard"
            className="w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150"
            prefetch={false}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard/files"
            className="w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150"
            prefetch={false}
          >
            <Folder className="w-5 h-5" />
            <span>Files</span>
          </Link>
          <Link
            href="/dashboard/notifications"
            className="w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150"
            prefetch={false}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className="w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150"
            prefetch={false}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          
          <Link
            href="/dashboard/settings"
            className="w-full flex items-center gap-2 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors duration-150"
            prefetch={false}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden -ml-2">
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
                <Link href="/dashboard" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                  Home
                </Link>
                <Link href="/dashboard/files" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                  Files
                </Link>
                <Link href="/dashboard/notifications" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                  Notifications
                </Link>
                <Link href="/dashboard/profile" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                  Profile
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-2 text-lg font-medium" prefetch={false}>
                  Settings
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}