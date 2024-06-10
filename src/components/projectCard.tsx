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
        <Link href={`/dashboard/projects/${project._id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                </CardHeader>

                <CardDescription className="p-2 px-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </CardDescription>

                <CardFooter>
                    
                </CardFooter>
            </Card>
        </Link>
    )
}