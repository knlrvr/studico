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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import {  Ellipsis } from "lucide-react"

import { 
    DropdownMenu, 
    DropdownMenuContent,
     DropdownMenuItem, 
     DropdownMenuLabel, 
     DropdownMenuSeparator, 
     DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export default function CompletedTaskList({
    params
  } : {
      params: {
          projectId: Id<"projects">,
      }
  }) {

    const projectId = params?.projectId;

    const completedTasks = useQuery(api.tasks.getIncompletedTasks, {
        projectId: projectId, status: 'Completed'
    })


    const reactivateTask = useMutation(api.tasks.reactivateTask)
    const deleteTask = useMutation(api.tasks.deleteTask)

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
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <button 
                                                        onClick={() => {
                                                            reactivateTask({
                                                                taskId: task._id
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
                    <p className="text-neutral-500 text-sm italic">No tasks completed yet!</p>
                )}
            </CardContent>
        </Card>
    )
}