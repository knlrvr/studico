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
  
  export function DeleteProject({
    params
  } : {
    params: {
        projectId: Id<'projects'>
    }
  }) {

    const deleteProject = useMutation(api.projects.deleteProject)
    const currentProject = useQuery(api.projects.getProject, {
        projectId: params.projectId,
    });

    const router = useRouter();
    const { toast } = useToast();

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="text-xs mx-1 bg-red-500 hover:bg-red-600">
            Delete Project
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
                className="bg-red-500 hover:bg-red-600"
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
    )
  }
  