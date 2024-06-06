'use client'

import { Authenticated } from "convex/react";

export default function NotificationsPage() {
    return (
        <main className="flex flex-col pt-24 px-4">
        <Authenticated>
          <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide text-neutral-500">Notifications</h1>
          </div>
  
        </Authenticated>
      </main>
    )
}