import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"


export default function SkeletonPost() {
    return (
        <Card className="p-0 shadow-none border-t-0 border-l-0 border-r-0 border-b border-muted-background rounded-none w-full">
        <CardHeader className="p-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex flex-col space-y-1">
                <Skeleton className="w-32 h-4 rounded" />
                <Skeleton className="w-16 h-3 rounded" />
              </div>
            </div>
          </div>
        </CardHeader>
  
        <CardContent className="p-0 mt-4 text-sm pb-8 gap-2 flex flex-wrap">
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-1/2 h-4 rounded" />
            <Skeleton className="w-1/3 h-4 rounded" />
            <Skeleton className="w-1/4 h-4 rounded" />
            <Skeleton className="w-1/2 h-4 rounded" />
        </CardContent>
  
        <CardFooter className='p-0 pb-4'>

        </CardFooter>
      </Card>
    )
}