'use client'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {

  const createProject = useMutation(api.projects.createProject)
  const projects = useQuery(api.projects.getProjects)

  return (
    <main className="flex flex-col min-h-screen justify-center items-center">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>

      <Authenticated>
        <UserButton />


        <button
          onClick={() => 
            createProject({ title: 'hello 3' })
          }
        >
          Click
        </button>

          {projects?.map((project) => (
            <div key={project._id}>{project.title}</div>
          ))}

      </Authenticated>
    </main>
  );
}
