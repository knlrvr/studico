'use client'

import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function ProjectPage({
    params
} : {
    params: {
        projectId: Id<"projects">
    }
}) {

  const project = useQuery(api.projects.getProject, {
    projectId: params.projectId
  });

  if(!project) {
    return <div className="min-h-screen flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  }

  return (
    <main className="flex flex-col pt-24 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-neutral-500 text-lg tracking-wide">
            {project?.title}
          </h1>
        </div>



    </main>
  );
}