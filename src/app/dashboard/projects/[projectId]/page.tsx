'use client'

import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import { Id } from "../../../../../convex/_generated/dataModel";
import { Loader2, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectMessages from "@/components/messages";
import ProjectFiles from "@/components/project-files";
import UploadFileProjectButton from "@/components/upload-file-project-button";
import { Overview } from "@/components/overview";
import { Notifications } from "@/components/notifications";
import RecentProjectFiles from "@/components/recent-project-files";
import { ProjectProvider } from "../context";
import Link from "next/link";
import SettingsContent from "@/components/settings";

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
    <main className="flex flex-col pt-20 px-4">

      <ProjectProvider projectId={params.projectId}>

          <Tabs defaultValue="overview" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 relative">
              
              {/* this feels cheap lmfao */}
              <h1 className="fixed z-[50] left-[4rem] sm:left-[18.5rem] top-[1.65rem] text-sm font-bold tracking-wider">
                {project.title}
              </h1>

              <div className="flex items-center justify-between gap-4 w-full">

                <TabsList className="w-fit flex justify-between sm:gap-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="chat">
                      Messages 
                    </TabsTrigger>
                    <TabsTrigger value='settings'>
                      <Settings className="w-4 h-4" />
                    </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-4">
                  <Notifications />
                  {/* add project settings page link here */}
                </div>

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

            <TabsContent value='settings'>
              <SettingsContent />
            </TabsContent>


          </Tabs>
        </ProjectProvider>
    </main>
  );
}