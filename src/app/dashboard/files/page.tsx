'use client'

import { Authenticated, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import UserFiles from "@/components/UserFiles";
import UploadFileUserButton from "@/components/uploadFileUserButton";
import RecentUserFiles from "@/components/recentUserFiles";

export default function FilesPage() {

    return (
        <main className="flex flex-col pt-24 px-4 items-start">
        <Authenticated>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-wide">Projects</h1>
              <p className="w-1/2 text-sm text-neutral-500">
                Create & view projects to manage for your organization or personal account. 
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