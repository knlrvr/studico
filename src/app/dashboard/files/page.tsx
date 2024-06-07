'use client'

import UploadFileButton from "@/components/uploadFileProjectButton";
import { Authenticated, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import FilePreview from "@/components/filePreview";
import UploadFileButtonTwo from "@/components/uploadFileUserButton";
import UserFiles from "@/components/UserFiles";
import UploadFileUserButton from "@/components/uploadFileUserButton";

export default function FilesPage() {

  const files = useQuery(api.files.getFilesForUser)

    return (
        <main className="flex flex-col pt-24 px-4 items-start mb-12">
        <Authenticated>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold tracking-wide text-neutral-500">All Files</h1>
          </div>

          <UploadFileUserButton />

          <UserFiles />
  
        </Authenticated>
      </main>
    )
}