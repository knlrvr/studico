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

export default function CreateTask() {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="flex flex-col items-start gap-4 h-fit w-36">
                    <Plus className="w-5 h-5" />
                    <p className="text-xs tracking-wide">New Task</p>
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll">
                <SheetHeader>
                <SheetTitle>Create Task</SheetTitle>
                <SheetDescription>
                    Create a new task here. Click save when you&apos;re done.
                </SheetDescription>
                </SheetHeader>
                <CreateTaskForm />
            </SheetContent>
        </Sheet>
    )
}
