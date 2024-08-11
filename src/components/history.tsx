import { useState, useEffect } from 'react';
import { useMutation } from "convex/react";
import { usePaginatedQuery } from "convex/react";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox"
import { api } from "../../convex/_generated/api";
import { timeStamp } from "@/lib/utils";
import { BarChart, ChevronLeft, ChevronRight, ChevronsRightLeft, File, MailIcon, PenLineIcon, Plus, RotateCcw, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useProjectId } from '@/app/dashboard/projects/context';

export default function History() {
    const projectId = useProjectId();
    const pageSize = 5;
    const [page, setPage] = useState(0);

    const { results, status, loadMore } = usePaginatedQuery(
        api.notifications.paginatedNotifications, 
        { projectId: projectId },
        { initialNumItems: pageSize }
    );

    useEffect(() => {
        if (status === "CanLoadMore" && results.length <= (page + 1) * pageSize) {
            loadMore(pageSize);
        }
    }, [page, results.length, status, loadMore]);

    const handleNextPage = () => {
        if (status === "CanLoadMore" || results.length > (page + 1) * pageSize) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const refreshNotifications = () => {
        setPage(0);
    }

    const displayedNotifications = results.slice(page * pageSize, (page + 1) * pageSize);

    const deleteNotification = useMutation(api.notifications.deleteNotification);

    const isNextDisabled = status !== "CanLoadMore" && results.length <= (page + 1) * pageSize;

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="pb-0 relative">
                <CardTitle>Project History</CardTitle>
                <CardDescription>Complete history for this project.</CardDescription>
                <Button variant='ghost' size='icon' className="absolute top-2 right-3"
                    onClick={refreshNotifications}
                ><RotateCcw className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1 pb-4 pt-4">
                {displayedNotifications.length > 0 ? (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead colSpan={4} className="">Event</TableHead>
                                    <TableHead className="text-right text-xs hidden md:table-cell">dd/mm/yyyy</TableHead>
                                    <TableHead className="text-right text-xs">Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className=''>
                                {displayedNotifications.map((notification) => (
                                    <TableRow key={notification._id}>
                                        <TableCell colSpan={4} className="font-medium">
                                            <div className="flex gap-4">
                                                <div className="w-fit h-fit mt-1">
                                                    {notification.type === 'status' && <ChevronsRightLeft className="w-4 h-4" />}
                                                    {notification.type === 'priority' && <BarChart className="w-4 h-4" />}
                                                    {notification.type === 'upload' && <File className="w-4 h-4" />}
                                                    {notification.type === 'message' && <MailIcon className="w-4 h-4" />}
                                                    {notification.type === 'fullEdit' && <PenLineIcon className="w-4 h-4" />}
                                                    {notification.type === 'create' && <Plus className="w-4 h-4" />}
                                                    {notification.type === 'delete' && <TrashIcon className="w-4 h-4" />}
                                                </div>
                                                <p>{notification.text}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right text-xs text-neutral-500 hidden md:table-cell">{timeStamp(notification._creationTime)}</TableCell>
                                        <TableCell className="text-right">
                                            <Checkbox id="delete" className='mr-4' 
                                                onClick={() => {
                                                    deleteNotification({
                                                        notificationId: notification._id,
                                                    })
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination className="w-full py-4">
                            <PaginationContent className="flex w-full justify-between">
                                <Button variant='ghost' className="gap-2 m-1" 
                                    onClick={handlePreviousPage} disabled={page === 0}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <p>Previous</p>
                                </Button>
                                <Button variant='ghost' className="gap-2 m-1" 
                                    onClick={handleNextPage} disabled={isNextDisabled}
                                >
                                    <p>Next</p>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </PaginationContent>
                        </Pagination>
                    </>
                ) : (
                    <p className="text-sm text-neutral-500">No history to display.</p>
                )}
            </CardContent>
        </Card>
    );
}