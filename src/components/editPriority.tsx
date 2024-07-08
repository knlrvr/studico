import {
    ChevronsUpDown,
 } from "lucide-react"
  
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
  
  export function EditPriority({
    params
  } : {
    params: {
        taskId: Id<'tasks'>,
    }
  }) {

    const taskId = params?.taskId

    const editPriority = useMutation(api.tasks.editPriority)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="">
                    <ChevronsUpDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuLabel>Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button 
                        onClick={() => {
                            editPriority({taskId: taskId, priority: 'None' })
                        }}
                        className="w-full text-left"
                    >
                        None
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button 
                        onClick={() => {
                            editPriority({taskId: params?.taskId, priority: 'Low' })
                        }}
                        className="w-full text-left"
                    >
                        Low
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button 
                        onClick={() => {
                            editPriority({taskId: params?.taskId, priority: 'Medium' })
                        }}
                        className="w-full text-left"
                    >
                        Medium
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button 
                            onClick={() => {
                                editPriority({taskId: params?.taskId, priority: 'High' })
                            }}
                            className="w-full text-left"
                        >
                            High
                        </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button 
                            onClick={() => {
                                editPriority({taskId: params?.taskId, priority: 'Urgent' })
                            }}
                            className="w-full text-left"
                        >
                            Urgent
                        </button>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
  
