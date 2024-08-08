

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SendInviteForm from "./sendInvite"  
import { useState } from "react";

export default function Members() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Collaborators</CardTitle>
                <CardDescription>Active members in this project.</CardDescription>
            </CardHeader>
            <CardContent className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white dark:border-[#0d0d0d]"></div>
                <div className="w-12 h-12 rounded-full bg-red-500 border-4 border-white dark:border-[#0d0d0d]"></div>
                <div className="w-12 h-12 rounded-full bg-green-500 border-4 border-white dark:border-[#0d0d0d]"></div>
                <div className="w-12 h-12 rounded-full bg-yellow-500 border-4 border-white dark:border-[#0d0d0d]"></div>
                <div className="w-12 h-12 rounded-full bg-violet-500 border-4 border-white dark:border-[#0d0d0d]"></div>

            </CardContent>
            <CardFooter className="flex justify-end">
                <SendInviteForm onSave={() => setIsOpen(false)} />
            </CardFooter>
        </Card>
    )
}