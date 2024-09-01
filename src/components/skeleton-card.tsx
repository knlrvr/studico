import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard() {
    return (
        <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-8 w-36 rounded" />
                    </CardTitle>
                </CardHeader>

                <CardDescription className="px-6 py-2">
                    <div className="flex -space-x-4 pb-4">
                        <Skeleton className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d]" />
                        <Skeleton className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d]" />
                        <Skeleton className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d]" />
                        <Skeleton className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d]" />
                        <Skeleton className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0d0d0d]" />
                    </div>
                </CardDescription>
            </Card>
    )
}