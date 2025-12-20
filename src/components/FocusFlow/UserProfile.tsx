import type { FC } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const UserProfile: FC = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="outline-none rounded-full transition-transform hover:scale-105 form-focus-ring ring-offset-2 ring-primary/20">
                    <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                            {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 mr-4" align="end">
                <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-muted/30">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-medium text-sm truncate">{user.name}</span>
                        <span className="text-xs text-muted-foreground truncate">
                            {user.email}
                        </span>
                    </div>
                </div>
                <div className="p-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={logout}
                        className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
