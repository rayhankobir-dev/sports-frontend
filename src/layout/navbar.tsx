/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/lib/utils/ui/dropdown-menu";
import { Home, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/utils/ui/avatar";
import { getAvatarFallbackLetter } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { Link, NavLink } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { PiSoccerBall } from "react-icons/pi";

export default function Navbar() {
  const { auth }: any = useAuth();

  return (
    <header className="w-full fixed top-0 left-0 z-10 supports-backdrop-blur:bg-background/60 border-b flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800">
      <Link className="flex items-center  text-green-600" to="/">
        <PiSoccerBall className="h-7 w-7" />
        <span className="hidden md:block ml-2 text-xl font-bold">Soccer</span>
      </Link>
      <div className="flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-9 h-9 bg-green-500 inline-flex items-center justify-center cursor-pointer focus:outline-none">
              <AvatarImage src={auth.user?.avatar} />
              <AvatarFallback className="bg-green-500 text-white">
                {getAvatarFallbackLetter(auth.user?.fullName)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <CreatorMenuContent />
        </DropdownMenu>
        <div className={cn("block lg:hidden")}>
          <MobileSidebar />
        </div>
      </div>
    </header>
  );
}

export function CreatorMenuContent() {
  const { logout, auth }: any = useAuth();

  return (
    <DropdownMenuContent className="z-[101] min-w-48">
      <DropdownMenuLabel>
        <DropdownMenuLabel className="py-0">
          {auth.user.fullName}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-light py-0">
          {auth.user.email}
        </DropdownMenuLabel>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              cn(
                "flex w-full cursor-pointer",
                isActive ? "text-green-600" : "text-gray-800"
              )
            }
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </NavLink>
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/" className="w-full flex cursor-pointer">
            <Home className="mr-2 h-4 w-4" />
            <span>Go Home</span>
          </Link>
          <DropdownMenuShortcut>⌘GH</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={logout}
        className="text-rose-500 hover:bg-rose-100 hover:text-rose-600 cursor-pointer"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
