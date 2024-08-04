'use client'

import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { BarChart, Bell, ChevronsRightLeft, File, MailIcon, PenLineIcon, Plus, TrashIcon } from "lucide-react"

import { ScrollArea } from "./ui/scroll-area"
import { Checkbox } from "./ui/checkbox"
import { timeAgo } from "@/lib/utils"

export function Notifications({
    params
} : {
    params: {
        projectId: Id<"projects">,
    }
}) {

    const currentProject = params.projectId;

    const notifications = useQuery(api.notifications.getNotifications, {
        projectId: currentProject,
    });

    const markAsRead = useMutation(api.notifications.markNotifAsRead);
    const markAllAsRead = useMutation(api.notifications.markAllNotifsAsRead);

    const unreadNotifications = notifications?.filter(notification => !notification.isRead);
    const hasNewNotifications = !!unreadNotifications?.length;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='ghost' size='icon' className="relative">
                    <Bell className="w-4 h-4" />
                    {hasNewNotifications && (
                        <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-background pr-[0.1rem]">
                            {unreadNotifications.length}
                        </div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="">
                        <h4 className="font-medium leading-none text-neutral-500">Notifications</h4>
                    </div>
                    <ScrollArea>
                        <div className="space-y-2">
                            {!hasNewNotifications && <p className="text-neutral-500 text-sm">No new notifications to display</p>}
                            {notifications?.length !== undefined && notifications?.length > 0 && 
                                unreadNotifications?.map((notification) => (
                                    <div
                                        key={notification._id}
                                        className="flex justify-between items-start gap-2"
                                    >
                                        <div className="w-fit h-fit mt-1 text-neutral-500">
                                            {notification.type === 'status' && (
                                                <ChevronsRightLeft className="w-4 h-4" />
                                            )}
                                            {notification.type === 'priority' && (
                                                <BarChart className="w-4 h-4" />
                                            )}
                                            
                                            {notification.type === 'upload' && (
                                                <File className="w-4 h-4" />
                                            )}
                                            {notification.type === 'message' && (
                                                <MailIcon className="w-4 h-4" />
                                            )}

                                            {notification.type === 'fullEdit' && (
                                                <PenLineIcon className="w-4 h-4" />
                                            )}
                                            {notification.type === 'create' && (
                                                <Plus className="w-4 h-4" />
                                            )}
                                            {notification.type === 'delete' && (
                                                <TrashIcon className="w-4 h-4" />
                                            )}
                                        </div>

                                        <div
                                            className="flex flex-col space-y-2 pb-4"
                                        >
                                            <p className="text-sm">{notification.text}</p>
                                            <span className="text-xs text-neutral-500">{timeAgo(notification._creationTime)}</span>
                                        </div>
                                        {/* do we rly need this? */}
                                        {/* <Button
                                            variant='ghost' size='icon' className="w-5 h-4 mt-1"
                                            onClick={() => markAsRead({ id: notification._id })}
                                        >
                                            <Checkbox />
                                        </Button> */}
                                    </div>
                                ))
                            }
                        </div>
                    </ScrollArea>

                    {hasNewNotifications && (
                        <>
                            <div className="">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => markAllAsRead({projectId: currentProject })}
                                >
                                    Mark all as read
                                </Button>
                            </div>
                        </>
                    )}

                </div>
            </PopoverContent>
        </Popover>
    )
}
