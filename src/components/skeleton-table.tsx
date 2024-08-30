
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { PanelRightOpen } from "lucide-react"

export default function SkeletonTable() {
  return (
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Priority</TableHead>
                <TableHead className="hidden xl:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Due</TableHead>
                <TableHead className="text-right">Assigned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                  <TableRow className="">
                    <TableCell>
                      <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                    <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-xs">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="flex justify-end items-center">
                        <Skeleton className="w-6 h-6 rounded-full" />
                    </TableCell>
                  </TableRow>

                  <TableRow className="">
                    <TableCell>
                      <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                    <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-xs">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="flex justify-end items-center">
                        <Skeleton className="w-6 h-6 rounded-full" />
                    </TableCell>
                  </TableRow>

                  <TableRow className="">
                    <TableCell>
                      <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                    <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-xs">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="flex justify-end items-center">
                        <Skeleton className="w-6 h-6 rounded-full" />
                    </TableCell>
                  </TableRow>

                  <TableRow className="">
                    <TableCell>
                      <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                    <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-xs">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="flex justify-end items-center">
                        <Skeleton className="w-6 h-6 rounded-full" />
                    </TableCell>
                  </TableRow>

                  <TableRow className="">
                    <TableCell>
                      <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                    <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-xs">
                        <Skeleton className="w-12 h-5 rounded-md" />
                    </TableCell>
                    <TableCell className="flex justify-end items-center">
                        <Skeleton className="w-6 h-6 rounded-full" />
                    </TableCell>
                  </TableRow>
            </TableBody>
        </Table>
  )
}