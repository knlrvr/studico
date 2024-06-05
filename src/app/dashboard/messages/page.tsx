'use client'

import { Authenticated } from "convex/react";

export default function MessagesPage() {
    return (
        <main className="flex flex-col pt-24 px-4">
        <Authenticated>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-neutral-500 text-lg tracking-wide">Messages</h1>
          </div>
  
        </Authenticated>
      </main>
    )
}