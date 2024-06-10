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
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import CreateTask from "./createTask"

export default function AllTasks({
    params
  } : {
      params: {
          projectId: Id<"projects">,
      }
  }) {

    const projectId = params?.projectId;

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
                                <TableHead className="hidden lg:table-cell">Status</TableHead>
                                <TableHead className="text-right">Assigned To</TableHead>
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
                                            <Badge 
                                                className={`text-xs text-background
                                                    ${task.priority === 'Low' && 'bg-yellow-400'}
                                                    ${task.priority === 'Medium' && 'bg-orange-400'}
                                                    ${task.priority === 'High' && 'bg-red-500'}
                                                `} 
                                                variant='secondary'>
                                                {task.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <Badge 
                                                className={`text-xs text-background ${task.status === 'Incomplete' ? 'bg-red-400' : 'bg-green-400' }`}>
                                                {task.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Avatar>
                                                <AvatarImage 
                                                    src={`${task.createdBy?.userImg}`} 
                                                    alt="user image" 
                                                    className="w-fit ml-auto h-7 rounded-full"    
                                                />
                                                <AvatarFallback></AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-neutral-500 text-sm">No tasks found. Add one now!</p>
                )}
            </CardContent>
            <CardFooter className="flex justify-end">
                <CreateTask params={{ projectId: params.projectId }} />
            </CardFooter>
        </Card>
    )
}