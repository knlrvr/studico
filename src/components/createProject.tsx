import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react";
import CreateProjectForm from "./createProjectForm";

export default function CreateProject() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Project
            </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-8">
                    <DialogTitle>What would you like to call your project?</DialogTitle>
                    <DialogDescription>
                        This project will be added to your dashboard.
                    </DialogDescription>

                    <CreateProjectForm onSave={() => setIsOpen(false)} />
                    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}