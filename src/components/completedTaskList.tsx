import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Id } from "../../convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

import {  Ellipsis } from "lucide-react"

import { 
    DropdownMenu, 
    DropdownMenuContent,
     DropdownMenuItem, 
     DropdownMenuLabel, 
     DropdownMenuSeparator, 
     DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/nextjs"
import { useProjectId } from "@/app/dashboard/projects/context"

export default function CompletedTaskList() {

    const projectId = useProjectId();

    const { user } = useUser();

    const completedTasks = useQuery(api.tasks.getIncompletedTasks, {
        projectId: projectId, status: 'Completed'
    })

    const reactivateTask = useMutation(api.tasks.reactivateTask)
    const deleteTask = useMutation(api.tasks.deleteTask)

    const taskNotification = useMutation(api.notifications.createNotification)

    return (
        <Card>
            <CardHeader className="px-6">
                <CardTitle>Completed Tasks</CardTitle>
                <CardDescription>All completed tasks.</CardDescription>
            </CardHeader>
            <CardContent>
                {completedTasks?.length != undefined && completedTasks?.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Task</TableHead>
                                <TableHead className="hidden sm:table-cell">Category</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {completedTasks?.map((task) => {
                                return (
                                    <TableRow key={task._id} className="">
                                        <TableCell>
                                            <div className="font-medium">{task.title}</div>
                                            <div className="hidden text-sm text-muted-foreground lg:inline">
                                                {task.description}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs">
                                                {task.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Ellipsis className="w-5 h-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="space-y-1">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <button 
                                                        onClick={() => {
                                                            reactivateTask({
                                                                taskId: task._id
                                                            })
                                                            taskNotification({
                                                                projectId: projectId,
                                                                type: 'status',
                                                                text: `${user?.fullName} has reactivated '${task.title}'`
                                                            })
                                                        }}
                                                        className="">
                                                            Reactivate
                                                        </button>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <button 
                                                        onClick={() => {
                                                            deleteTask({
                                                                taskId: task._id
                                                            });
                                                            taskNotification({
                                                                projectId: projectId,
                                                                type: 'delete',
                                                                text: `${user?.fullName} has permanently deleted '${task.title}'`
                                                            })
                                                        }}
                                                        className="">
                                                            Delete
                                                        </button>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-muted-foreground text-sm">No tasks completed yet.</p>
                )}
            </CardContent>
        </Card>
    )
}