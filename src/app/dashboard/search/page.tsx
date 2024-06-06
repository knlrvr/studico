'use client'

import { Authenticated } from "convex/react";

export default function SettingsPage() {
    return (
        <main className="flex flex-col pt-24 px-4">
        <Authenticated>
          <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide text-neutral-500">Search All</h1>
          </div>
  
        </Authenticated>
      </main>
    )
}