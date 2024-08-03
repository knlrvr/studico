'use client'

import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Bell, CheckIcon } from "lucide-react"
import { Separator } from "./ui/separator"
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
                <Button variant='ghost' size='icon' className="p-2 relative">
                    <Bell className="w-4 h-4" />
                    {hasNewNotifications && (
                        <div className="absolute top-0.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                            {unreadNotifications.length}
                        </div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Notifications</h4>
            </div>
            <ScrollArea>
                <div className="space-y-4">
                    {!hasNewNotifications && <p className="text-neutral-500 text-sm">No new notifications to display</p>}
                    {notifications?.length !== undefined && notifications?.length > 0 && 
                        unreadNotifications?.map((notification) => (
                        <div
                            key={notification._id}
                            className="flex justify-between"
                        >
                            <div
                                className="flex flex-col space-y-2 pb-4"
                            >
                                <p className="text-sm">{notification.text}</p>
                                <span className="text-xs text-neutral-500">{timeAgo(notification._creationTime)}</span>
                            </div>
                            <Button
                                variant='ghost'
                                onClick={() => markAsRead({ id: notification._id })}
                            >
                                <Checkbox />
                            </Button>
                        </div>
                    ))
                }
                </div>
            </ScrollArea>

            {hasNewNotifications && (
                <>
                    <Separator />
                    <div className="pb-4">
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
