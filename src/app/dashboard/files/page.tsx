'use client'

import { Authenticated } from "convex/react";
import UserFiles from "@/components/user-files";
import UploadFileUserButton from "@/components/uploadFileUserButton";
import RecentUserFiles from "@/components/recent-user-files";

export default function FilesPage() {

    return (
        <main className="flex flex-col pt-24 px-4 items-start">
        <Authenticated>
          <div className="flex justify-between items-center w-full mt-1">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-wide">Files</h1>
              <p className="w-1/2 sm:w-2/3 text-sm text-neutral-500">
                Upload & manage your personal files. 
              </p>
            </div>
            <UploadFileUserButton />
          </div>

          <RecentUserFiles />

          <UserFiles />
  
        </Authenticated>
      </main>
    )
}