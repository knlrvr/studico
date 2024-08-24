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

import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import CreateTask from "./createTask"
import { EditPriority } from "./editPriority"
import { EditStatus } from "./editStatus"
import TaskActions from "./taskActions"
import { useProjectId } from "@/app/dashboard/projects/context"

import { futureDate } from "@/lib/utils"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

export default function AllTasks() {

    const projectId = useProjectId();

    const currentProject = useQuery(api.projects.getProject, {
        projectId: projectId,
    })

    const allTasks = useQuery(api.tasks.getTasks, {
        projectId: projectId,
    })

    return (
        <Card>
            <CardHeader className="px-6">
                <CardTitle>All Tasks</CardTitle>
                <CardDescription>Task list for this project.</CardDescription>
            </CardHeader>
            <CardContent>
                {allTasks?.length != undefined && allTasks?.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Task</TableHead>
                                <TableHead className="hidden sm:table-cell">Category</TableHead>
                                <TableHead className="hidden md:table-cell">Priority</TableHead>
                                <TableHead className="hidden xl:table-cell">Status</TableHead>
                                <TableHead className="hidden lg:table-cell text-right">Due</TableHead>
                                <TableHead className="text-right">Assigned</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allTasks?.map((task) => {
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
                    <p className="text-muted-foreground text-sm">No tasks found. Add one now!</p>
                )}
            </CardContent>
            <CardFooter className="flex justify-end">
                <CreateTask />
            </CardFooter>
        </Card>
    )
}