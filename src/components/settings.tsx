import { useProjectId } from "@/app/dashboard/projects/context";
import { DeleteProject } from "./deleteProject";
import Members from "./members";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "./ui/card";
import { useUser } from "@clerk/nextjs";

export default function SettingsContent() {

    const projectId = useProjectId();
    const { user } = useUser();

    const currentProject = useQuery(api.projects.getProject, {
        projectId: projectId,
    });
    return (
        <div className="space-y-4">
            <Members />

            {currentProject?.tokenIdentifier?.includes(user?.id as string) && (
            <Card>
                <CardHeader>
                    <CardTitle>Delete Project</CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will permanently delete your
                        project and all of it&apos;s associated data. Please only continue if you&apos;re 
                        absolutely sure that you want to delete this project.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                    <DeleteProject />
                </CardContent>
            </Card>
            )}
            
        </div>
    )
}