'use client'

import { useOrganization, useUser } from "@clerk/nextjs";
import { Authenticated, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import ProjectCard from "@/components/project-card";
import CreateProject from "@/components/create-project";
import Invites from "@/components/invites";
import { Suspense } from "react";
import SkeletonCard from "@/components/skeleton-card";

export default function Home() {

  const organization = useOrganization();

  const projects = useQuery(api.projects.getProjects, {
    orgId: organization.organization?.id,
  });

  return (
    <main className="flex flex-col pt-24 px-4">
      <Authenticated>
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold tracking-wide">Projects</h1>
              <Invites />
            </div>
            <p className="w-1/2 sm:w-2/3 text-sm text-neutral-500">
              Create & view projects to manage for your organization or personal account. 
            </p>
          </div>
          <CreateProject />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
          {projects?.map((project) => (
            <Suspense key={project._id} fallback={<SkeletonCard />}>
              <ProjectCard project={project} />
            </Suspense>
          ))} 
        </div>

      </Authenticated>
    </main>
  );
}