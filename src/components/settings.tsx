import { useProjectId } from "@/app/dashboard/projects/context"
import { DeleteProject } from "./deleteProject";
import Members from "./members";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";


export default function SettingsContent() {

    return (
        <div className="space-y-4">
            <Members />
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

        </div>
    )
}