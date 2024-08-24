import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { PanelRightOpen } from "lucide-react"
import { Id } from "../../convex/_generated/dataModel"
import EditTaskForm from "./editTaskForm"

export default function TaskActions({
    params,
    projectId,
}: {
    params: {
        taskId: Id<'tasks'>,
    },
    projectId: string,
}) {
    return (
        <Sheet>
            <SheetTrigger>
                <span className="sr-only">Open</span>
                <PanelRightOpen className="w-4 h-4" />
            </SheetTrigger>
            <SheetContent className="overflow-scroll">
                <SheetHeader>
                <SheetTitle>Task Details</SheetTitle>
                <SheetDescription>
                    View your task here. Click save or close when you&apos;re done.
                </SheetDescription>
                </SheetHeader>
                <EditTaskForm params={{ taskId: params.taskId }}
                />
            </SheetContent>
        </Sheet>
    )
}