'use client'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme";

export default function Home() {

  const createProject = useMutation(api.projects.createProject)
  const projects = useQuery(api.projects.getProjects)

  return (
    <main className="flex flex-col min-h-screen justify-center items-center">

      <Authenticated>
        <Button
          className="my-8"
          onClick={() => 
            createProject({ title: 'hello 1' })
          }
        >
          Click Me!
        </Button>

          {projects?.map((project) => (
            <div key={project._id}>{project.title}</div>
          ))}
      </Authenticated>
    </main>
  );
}
