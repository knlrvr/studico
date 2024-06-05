'use client'

import { Authenticated } from "convex/react";

export default function ProfilePage() {
    return (
        <main className="flex flex-col pt-24 px-4">
        <Authenticated>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-neutral-500 text-lg tracking-wide">Profile</h1>
          </div>
  
        </Authenticated>
      </main>
    )
}