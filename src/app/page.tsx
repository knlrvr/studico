'use client'

import Link from "next/link"
import { Authenticated, Unauthenticated } from "convex/react"
import { SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { redirect } from "next/dist/server/api-utils"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] max-w-4xl mx-auto justify-between items-center">
      
      <div></div>
      
      <main className="">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold tracking-tighter xl:text-6xl/none">
                    <span className="italic">Studico</span>&nbsp;&nbsp;&mdash;&nbsp; Elevate Your Music Production
                  </h1>
                  <p className="max-w-[600px] text-neutral-500">
                    Studico is a powerful web-based music production assistance suite that empowers you to create, collaborate, and
                    share your music.
                  </p>
                </div>
              
              </div>

              <div className="flex justify-between sm:justify-start gap-16">
                <Unauthenticated>
                  <Button asChild>
                    <SignInButton forceRedirectUrl={'/dashboard'}/>
                  </Button>
                </Unauthenticated>
                <Authenticated>
                  <Button>
                    <Link href="/dashboard">Go to dashboard</Link>
                  </Button>
                </Authenticated>
                <Button asChild
                  className="flex items-center gap-2"
                  variant='outline'>
                    <Link href='https://twitter.com/knlrvr' target="_blank">
                      <span>Learn More</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>


      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs ">&copy; 2024 Studico. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="https://github.com/knlrvr" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            GitHub
          </Link>
          <Link href="https://twitter.com/knlrvr" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Twitter
          </Link>
          <Link href="mailto:hello@knlrvr.com" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}