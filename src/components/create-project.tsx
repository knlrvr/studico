import { Plus } from "lucide-react";
import { Button } from "./ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle, 
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react";
import CreateProjectForm from "./create-project-form";

export default function CreateProject() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button className="flex flex-col items-start gap-4 h-fit min-w-32 text-xs">
                    <Plus className="w-5 h-5" />
                    <p className="tracking-wide">Create Project</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-2">
                    <DialogTitle>What would you like to call your project?</DialogTitle>
                    <DialogDescription className="pb-4">
                        This project will be added to your dashboard.
                    </DialogDescription>

                    <CreateProjectForm onSave={() => setIsOpen(false)} />
                    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}