'use client'

import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import { Id } from "../../../../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectMessages from "@/components/messages";
import ProjectFiles from "@/components/projectFiles";
import UploadFileProjectButton from "@/components/uploadFileProjectButton";
import { Overview } from "@/components/overview";
import { Notifications } from "@/components/notifications";

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

  const files = useQuery(api.files.getFilesForProject, {
    projectId: params.projectId,
  })

  if(!project) {
    return <div className="min-h-screen flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  }

  return (
    <main className="flex flex-col pt-24 px-4">

        {/* get ready for an insane amount of prop drilling bc I'm lazy */}

        <Tabs defaultValue="overview" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between mb-8 space-y-4 sm:space-y-0 relative">
              
              <h1 className="text-2xl font-bold tracking-wide text-neutral-500 w-full">
                {project.title}
              </h1>

              <div className="flex items-center justify-end gap-4 w-full">

                <TabsList className="w-full sm:w-fit flex justify-between sm:gap-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="chat">
                      Messages 
                      {/* make conditional, depends on newMessages !!! ? */}
                      <span className="ml-2 inline-flex text-xs bg-green-500 rounded-full p-1"></span>
                    </TabsTrigger>
                </TabsList>

                <Notifications params={{ projectId: project._id }} />

              </div>

            </div>

            <TabsContent value="overview">
              <Overview params={{ projectId: params.projectId }}/>
            </TabsContent>
            <TabsContent value="files">
              <div className="mb-24">
                <UploadFileProjectButton projectId={params.projectId} />

                <div className="mt-8">
                  <ProjectFiles params={{ projectId: params.projectId }} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="chat">
              <ProjectMessages params={{ projectId: params.projectId }} />
            </TabsContent>
        </Tabs>
    </main>
  );
}