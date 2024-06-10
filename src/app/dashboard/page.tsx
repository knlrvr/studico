'use client'

import { useOrganization } from "@clerk/nextjs";
import { Authenticated, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import ProjectCard from "@/components/projectCard";
import CreateProject from "@/components/createProject";



export default function Home() {

  const organization = useOrganization();


  const projects = useQuery(api.projects.getProjects, {
    orgId: organization.organization?.id
  })

  return (
    <main className="flex flex-col pt-24 px-4">
      <Authenticated>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide text-neutral-500">Projects</h1>
          <CreateProject />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
          {projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </Authenticated>
    </main>
  );
}