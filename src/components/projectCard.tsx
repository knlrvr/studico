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
    
    const date = new Date;

    return (
        <Link href={`/dashboard/projects/${project._id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                </CardHeader>

                <CardDescription className="p-2 px-6 tracking-wider font-medium">

                    {new Date(project._creationTime).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })}               

                </CardDescription>

                <CardFooter>
                    
                </CardFooter>
            </Card>
        </Link>
    )
}