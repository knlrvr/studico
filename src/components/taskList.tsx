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
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

export default function TaskList({
    params
  } : {
      params: {
          projectId: Id<"projects">,
      }
  }) {

    const projectId = params?.projectId;

    const tasks = useQuery(api.tasks.getTasks, {
        projectId: projectId,
    })

    return (
        <Card>
            <CardHeader className="px-6">
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Task list for this project.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead className="hidden sm:table-cell">Category</TableHead>
                            <TableHead className="hidden sm:table-cell">Priority</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead className="text-right">Assigned To</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>


                        {tasks?.map((task) => {
                            return (
                                <TableRow key={task._id} className="">
                                    <TableCell>
                                        <div className="font-medium">{task.title}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {task.description}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs">
                                            {task.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant='secondary'>
                                            {task.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge className="text-xs bg-red-400 text-background">
                                            {task.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Avatar>
                                            <AvatarImage src=''>{task.createdBy.userImg}</AvatarImage>
                                            <AvatarFallback>KL</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button className="rounded-full h-fit p-2">
                    <Plus className="w-5 h-5" />
                </Button>
            </CardFooter>
        </Card>
    )
}
