import { useState } from "react"

import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
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

import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

import { EditPriority } from "./edit-priority"
import { EditStatus } from "./edit-status"
import TaskActions from "./task-actions"
import { useProjectId } from "@/app/dashboard/projects/context"

import { futureDate } from "@/lib/utils"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

export default function UserTasks() {

    const projectId = useProjectId();

    const currentProject = useQuery(api.projects.getProject, {
        projectId: projectId,
    })

    const userTasks = useQuery(api.tasks.getUserTasks, { 
        projectId: projectId
    })

    return (
        <Card>
            <CardHeader className="px-6">
                <CardTitle>Your Tasks</CardTitle>
                <CardDescription>These tasks have been assigned to you.</CardDescription>
            </CardHeader>
            <CardContent>
                {userTasks?.length !== undefined && userTasks?.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Task</TableHead>
                                <TableHead></TableHead>
                                <TableHead className="hidden sm:table-cell">Category</TableHead>
                                <TableHead className="hidden md:table-cell">Priority</TableHead>
                                <TableHead className="hidden xl:table-cell">Status</TableHead>
                                <TableHead className="hidden lg:table-cell text-right">Due</TableHead>                                
                                <TableHead className="text-right">Assigned</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userTasks?.map((task) => {
                                return (
                                    <TableRow key={task._id} className="">
                                        <TableCell colSpan={2}>
                                            <div className="font-medium">{task.title}</div>
                                            <div className="hidden text-sm text-muted-foreground xl:inline">
                                                {task.description}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs">
                                                {task.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div className="flex items-center space-x-2">
                                                <Badge 
                                                    className={`text-xs text-background
                                                        ${task.priority === 'None' && 'text-green-500'}
                                                        ${task.priority === 'Low' && 'text-yellow-500'}
                                                        ${task.priority === 'Medium' && 'text-orange-400'}
                                                        ${task.priority === 'High' && 'text-red-400'}
                                                        ${task.priority === 'Urgent' && 'text-red-600'}
                                                    `} 
                                                    variant='secondary'>
                                                    <p className="min-w-12 text-center">{task.priority}</p>
                                                </Badge>
                                                <EditPriority projectId={projectId} params={{ taskId: task._id }} taskName={task.title}/>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            <div className="flex items-center space-x-2">
                                                <Badge 
                                                    className={`text-xs text-background ${task.status === 'Incomplete' ? 'bg-red-500' : 'bg-green-500' }`}>
                                                    {task.status}
                                                </Badge>

                                                <EditStatus 
                                                    status={`${task.status}`} 
                                                    params={{ taskId: task._id }} 
                                                    taskName={task.title}
                                                    projectId={currentProject?._id as string} 
                                                    projectName={currentProject?.title as string}
                                                />

                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell text-right text-xs">
                                            <p>{futureDate(task.completeByDate)}</p>
                                        </TableCell>
                                        <TableCell className="flex justify-end">
                                            <Avatar className="">
                                                <AvatarImage className="w-6 h-6 rounded-full"
                                                    src={`${task.assignedTo?.userImg}`}
                                                />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <TaskActions projectId={projectId} params={{ taskId: task._id }} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-muted-foreground text-sm">No tasks have been assigned to you.</p>
                )}
            </CardContent>
        </Card>
    )
}