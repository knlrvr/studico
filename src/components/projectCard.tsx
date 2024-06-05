import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link"
  
import { Doc } from '../../convex/_generated/dataModel'

export default function ProjectCard({ project } : { project: Doc<'projects'> }) {
    return (
        <Link href={`/projects/${project._id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                </CardHeader>

                <CardDescription className="p-2 px-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </CardDescription>

                <CardFooter>
                    <div className="flex items-center mt-6 -space-x-2">

                        {/* mimic active users pfp */}
                        <div className="h-7 w-7 rounded-full bg-yellow-400 border-2 border-background"></div>
                        <div className="h-7 w-7 rounded-full bg-blue-600 border-2 border-background"></div>
                        <div className="h-7 w-7 rounded-full bg-red-500 border-2 border-background"></div>
                        <div className="h-7 w-7 rounded-full bg-green-600 border-2 border-background"></div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}