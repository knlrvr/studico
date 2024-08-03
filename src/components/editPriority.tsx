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
                <Button variant="ghost" className="">
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
                                text: `${user?.fullName} changed the priority of '${taskName}' to None.`
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
                                text: `${user?.fullName} changed the priority of '${taskName}' to Low.`
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
                                text: `${user?.fullName} changed the priority of '${taskName}' to Medium.`
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
                                    text: `${user?.fullName} changed the priority of '${taskName}' to High.`
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
                                    text: `${user?.fullName} changed the priority of '${taskName}' to Urgent.`
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