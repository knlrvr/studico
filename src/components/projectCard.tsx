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
        <Link href="/">
            <Card>
                <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}