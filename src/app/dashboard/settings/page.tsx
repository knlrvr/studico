'use client'

import { Authenticated } from "convex/react";

import { UserProfile, useUser } from "@clerk/nextjs";

export default function SettingsPage() {
    return (
        <main className="flex flex-col pt-24 px-4">
        <Authenticated>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold tracking-wide text-neutral-500">Settings</h1>
          </div>

          <div className="mb-8">
            <UserProfile 
              routing="hash"
              appearance={{
                elements: {
                  scrollBox: "bg-[#111]"
                }
              }}
            />
          </div>

        </Authenticated>
      </main>
    )
}