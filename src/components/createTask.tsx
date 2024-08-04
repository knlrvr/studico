import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import CreateTaskForm from "./createTaskForm"
import { Id } from "../../convex/_generated/dataModel"

export default function CreateTask({
    params
}: {
    params: {
        projectId: Id<'projects'>
    }
}) {
    return (
        <Sheet>
            <SheetTrigger>
                <span className="sr-only">Create A Task</span>
                <Plus className="w-6 h-6 rounded-full bg-primary text-background" />
            </SheetTrigger>
            <SheetContent className="overflow-scroll">
                <SheetHeader>
                <SheetTitle>Create Task</SheetTitle>
                <SheetDescription>
                    Create a new task here. Click save when you&apos;re done.
                </SheetDescription>
                </SheetHeader>
                <CreateTaskForm 
                    params={{ projectId: params.projectId }}
                />
            </SheetContent>
        </Sheet>
    )
}
