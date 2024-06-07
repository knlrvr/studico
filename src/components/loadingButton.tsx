import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export function LoadingButton({ 
    isLoading, 
    children,
    loadingText
} : { 
    isLoading: boolean,
    children: React.ReactNode,
    loadingText: string,
}) {
    return (
        <Button asChild
            disabled={isLoading}
            type="submit">
              <div className="flex items-center gap-2">
                {isLoading ? loadingText : children}
                {isLoading && <Loader2 className="animate-spin" /> }
              </div>
        </Button> 
    )
}