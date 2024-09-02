import {
    ChevronsUpDown,
 } from "lucide-react"
  
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
  
  export function EditStatus({
    params,
    status,
    taskName,
    projectId,
    projectName
  } : {
    params: {
        taskId: Id<'tasks'>,
    },
    status: string,
    taskName: string,
    projectId: string,
    projectName: string,
  }) {

    const taskId = params?.taskId

    const { user } = useUser();

    const reactivateTask = useMutation(api.tasks.reactivateTask)
    const completeTask = useMutation(api.tasks.completeTask)
    const deleteTask = useMutation(api.tasks.deleteTask)

    const taskStatusNotification = useMutation(api.notifications.createNotification);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="">
                    <ChevronsUpDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {status === 'Completed' && (
                    <DropdownMenuItem>
                        <button 
                            onClick={() => {
                                reactivateTask({ taskId: taskId });
                                taskStatusNotification({
                                    projectId: projectId,
                                    type: 'status',
                                    text: `${user?.fullName} changed the status of '${taskName}' to incomplete`
                                })
                            }}
                            className="w-full text-left"
                        >
                            Reactivate
                        </button>
                    </DropdownMenuItem>
                )}
                {status === 'Incomplete' && (
                    <DropdownMenuItem>
                        <button 
                            onClick={() => {
                                completeTask({ taskId: taskId })
                                taskStatusNotification({
                                    projectId: projectId,
                                    type: 'status',
                                    text: `${user?.fullName} changed the status of '${taskName}' to complete`
                                })
                            }}
                            className="w-full text-left"
                        >
                            Complete
                        </button>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                    <button 
                        onClick={() => {
                            deleteTask({
                                taskId: taskId,
                            })
                            taskStatusNotification({
                                projectId: projectId,
                                type: 'delete',
                                text: `${user?.fullName} permanently deleted '${taskName}'`
                            })
                    }}
                    className="">
                        Delete
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}