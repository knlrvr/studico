import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Id } from "../../convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

import { useRouter } from "next/navigation"
import { useToast } from "./ui/use-toast"
import { TrashIcon } from "lucide-react"
import { ProjectProvider, useProjectId } from "@/app/dashboard/projects/context"
import { useUser } from "@clerk/nextjs"
  
export function DeleteProject() {

    const projectId = useProjectId();
    const { user } = useUser();

    const deleteProject = useMutation(api.projects.deleteProject)
    const currentProject = useQuery(api.projects.getProject, {
        projectId: projectId,
    });

    const router = useRouter();
    const { toast } = useToast();

    return (
      <>
        {currentProject?.tokenIdentifier?.includes(user?.id as string) && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex flex-col items-start gap-4 h-fit w-36 bg-red-500 hover:bg-red-600 text-xs">
                <TrashIcon className="w-4 h-4" />
                <p className="tracking-wide">Delete Project</p>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  project and all of it&apos;s associated data. Please only continue if you&apos;re 
                  absolutely sure. 
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button 
                    className=""
                    onClick={() => {
                        deleteProject({
                            projectId: currentProject?._id as Id<'projects'>
                        });
                        router.push('/dashboard');
                        toast({
                            description: "Your project has successfully been deleted and you have been redirected to your dashboard.",
                        });
                    }}
                >
                    Delete Project
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </>
    )
  }
  