'use client'

import UploadFileButton from "@/components/uploadFileButton";
import { Authenticated } from "convex/react";

export default function FilesPage() {
    return (
        <main className="flex flex-col pt-24 px-4">
        <Authenticated>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold tracking-wide text-neutral-500">Files</h1>
            <UploadFileButton />
          </div>
  
        </Authenticated>
      </main>
    )
}