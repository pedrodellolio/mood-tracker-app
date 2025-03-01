import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, Menu, Palette } from "lucide-react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import NavBreadcrumb from "./nav-breadcrumb";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { isColorblindMode, toggleColorblindMode, toggleSidebar } =
    useUserPreferences();

  return (
    <div className="flex justify-between items-center w-full gap-10 mb-10">
      <div className="flex items-center gap-12">
        <Button variant={"noShadow"} size={"icon"} onClick={toggleSidebar}>
          <Menu />
        </Button>
        <NavBreadcrumb />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="noShadow" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.photoURL ?? ""}
                alt={user?.displayName ?? ""}
              />
              <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.displayName}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={toggleColorblindMode}
            className="cursor-pointer"
          >
            <Palette className="mr-2 h-4 w-4" />
            <div className="flex flex-row items-center justify-between w-full">
              <span>Colorblind</span>
              <span
                className={`text-xs ${
                  isColorblindMode ? "text-green-600" : "text-red-500"
                }`}
              >
                {isColorblindMode ? "Enabled" : "Disabled"}
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
