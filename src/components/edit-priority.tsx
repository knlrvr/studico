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
  
  export function EditPriority({
    params,
    projectId,
    taskName
  } : {
    params: {
        taskId: Id<'tasks'>,
    },
    projectId: string,
    taskName: string,
  }) {

    const taskId = params?.taskId

    const editPriority = useMutation(api.tasks.editPriority);
    const taskPriorityNotification = useMutation(api.notifications.createNotification);

    const { user } = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-fit hover:bg-transparent">
                    <ChevronsUpDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuLabel>Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button 
                        onClick={() => {
                            editPriority({taskId: taskId, priority: 'None' })
                            taskPriorityNotification({
                                projectId: projectId,
                                type: 'priority',
                                text: `${user?.fullName} changed the priority of '${taskName}' to none`
                            })
                        }}
                        className="w-full text-left"
                    >
                        None
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button 
                        onClick={() => {
                            editPriority({taskId: params?.taskId, priority: 'Low' });
                            taskPriorityNotification({
                                projectId: projectId,
                                type: 'priority',
                                text: `${user?.fullName} changed the priority of '${taskName}' to low`
                            })
                        }}
                        className="w-full text-left"
                    >
                        Low
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button 
                        onClick={() => {
                            editPriority({taskId: params?.taskId, priority: 'Medium' });
                            taskPriorityNotification({
                                projectId: projectId,
                                type: 'priority',
                                text: `${user?.fullName} changed the priority of '${taskName}' to medium`
                            })
                        }}
                        className="w-full text-left"
                    >
                        Medium
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button 
                            onClick={() => {
                                editPriority({taskId: params?.taskId, priority: 'High' });
                                taskPriorityNotification({
                                    projectId: projectId,
                                    type: 'priority',
                                    text: `${user?.fullName} changed the priority of '${taskName}' to high`
                                })
                            }}
                            className="w-full text-left"
                        >
                            High
                        </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button 
                            onClick={() => {
                                editPriority({taskId: params?.taskId, priority: 'Urgent' });
                                taskPriorityNotification({
                                    projectId: projectId,
                                    type: 'priority',
                                    text: `${user?.fullName} changed the priority of '${taskName}' to urgent`
                                })
                            }}
                            className="w-full text-left"
                        >
                            Urgent
                        </button>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}