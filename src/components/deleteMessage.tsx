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
import { Ellipsis } from "lucide-react"
import { Button } from "./ui/button"
import { Id } from "../../convex/_generated/dataModel"
import { useToast } from "./ui/use-toast"
  
  export function DeleteMessage({
    id
  } : {
    id: string,
  }) {

    const deleteMessage = useMutation(api.projects.deleteMessage)
    const { toast } = useToast();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-fit h-fit">
                <Ellipsis className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button className="text-red-500"
                        onClick={() => {
                        deleteMessage({
                            messageId: id as Id<'messages'>,
                        });
                        toast({
                            description: "Message successfully deleted.",
                        });
                    }}>
                        Delete Message
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
  }
  