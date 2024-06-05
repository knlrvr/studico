'use client'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme";
import ProjectCard from "@/components/projectCard";
import { Plus } from "lucide-react";
import CreateProject from "@/components/createProject";



export default function Home() {

  const projects = useQuery(api.projects.getProjects)

  return (
    <main className="flex flex-col pt-24 px-4">
      <Authenticated>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-neutral-500 text-lg tracking-wide">My Projects</h1>
          <CreateProject />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </Authenticated>
    </main>
  );
}
