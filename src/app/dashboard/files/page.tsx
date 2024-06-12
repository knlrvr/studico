'use client'

import { Authenticated, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import UserFiles from "@/components/UserFiles";
import UploadFileUserButton from "@/components/uploadFileUserButton";

export default function FilesPage() {

  const files = useQuery(api.files.getFilesForUser)

    return (
        <main className="flex flex-col pt-24 px-4 items-start mb-12">
        <Authenticated>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide text-neutral-500">All Files</h1>
          </div>
          <div className="mb-6">
            <p className="w-full text-sm text-neutral-500">
              Upload & manage your personal files. 
            </p>
          </div>

          <UploadFileUserButton />

          <UserFiles />
  
        </Authenticated>
      </main>
    )
}