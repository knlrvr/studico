import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { PencilLine } from "lucide-react"
import { Id } from "../../convex/_generated/dataModel"
import EditTaskForm from "./editTaskForm"

export default function EditTask({
    params
}: {
    params: {
        taskId: Id<'tasks'>,
    }
}) {
    return (
        <Sheet>
            <SheetTrigger className="">
                <span className="sr-only">Edit Task</span>
                <PencilLine className="w-4 h-4" />
            </SheetTrigger>
            <SheetContent className="overflow-scroll">
                <SheetHeader>
                <SheetTitle>Edit Task</SheetTitle>
                <SheetDescription>
                    Edit your task here. Click save when you&apos;re done.
                </SheetDescription>
                </SheetHeader>
                <EditTaskForm 
                    params={{ taskId: params.taskId }}
                />
            </SheetContent>
        </Sheet>
    )
}