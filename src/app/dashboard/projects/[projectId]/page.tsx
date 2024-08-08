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
import RecentProjectFiles from "@/components/recentProjectFiles";
import { ProjectProvider } from "../context";

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

      <ProjectProvider projectId={params.projectId}>

          <Tabs defaultValue="overview" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 relative">
              
              {/* this feels cheap lmfao */}
              <h1 className="fixed z-[50] left-[4rem] sm:left-[18.5rem] top-[1.65rem] text-sm">
                {project.title}
              </h1>

              <div className="flex items-center justify-between gap-4 w-full">

                <TabsList className="w-fit flex justify-between sm:gap-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="chat">
                      Messages 
                    </TabsTrigger>
                </TabsList>

                <Notifications />

              </div>

            </div>

            <TabsContent value="overview">
              <Overview />
            </TabsContent>


            <TabsContent value="files">
              <div className="mb-24">
                <UploadFileProjectButton />
                <RecentProjectFiles />

                <div className="mt-8">
                  <ProjectFiles />
                </div>
              </div>
            </TabsContent>


            <TabsContent value="chat">
              <ProjectMessages />
            </TabsContent>


          </Tabs>
        </ProjectProvider>
    </main>
  );
}

// j576djbf14k3ybh4yen9xwp1ax6y5cec

// j576djbf14k3ybh4yen9xwp1ax6y5cec