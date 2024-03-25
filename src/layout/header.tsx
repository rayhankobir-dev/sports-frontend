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
import { Button } from "@/lib/utils/ui/button";
import { PiSoccerBall } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { cn, getAvatarFallbackLetter } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { Gauge, History, LogOut, User } from "lucide-react";
import { Avatar, AvatarImage } from "@/lib/utils/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { MobileSidebar } from "./mobile-sidebar";
import { Fragment } from "react";

const activeLinkClass =
  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors text-green-600 hover:text-green-600 hover:text-green-600 focus:text-green-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50";
const defaultLinkClass =
  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 hover:text-green-600 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50";
function HeaderSection() {
  const { auth, logout }: any = useAuth();
  return (
    <header className="inset-x-0 top-0 z-50 w-full bg-white backdrop-blur-lg sticky border-b ">
      <nav className="flex sticky justify-between h-16 lg:h-20 max-w-7xl mx-auto shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6 flex gap-2 text-green-600" to="/">
          <PiSoccerBall className="h-6 w-6" />
          <span className="hidden md:block italic font-semibold">Sports</span>
        </Link>
        <ul className="hidden lg:flex gap-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            end={true}
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/videos/genre/defense"
          >
            Defense
          </NavLink>
          <NavLink
            end={true}
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/videos/genre/mid-filder"
          >
            Midfilder
          </NavLink>
          <NavLink
            end={true}
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/videos/genre/striker"
          >
            Striker
          </NavLink>
        </ul>

        <div className="inline-flex gap-3 items-center">
          {auth.isAuth ? (
            <Fragment>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-9 h-9 bg-green-500 inline-flex items-center justify-center cursor-pointer">
                    <AvatarImage src={auth.user.avatar} />
                    <AvatarFallback className="bg-green-500 text-white">
                      {getAvatarFallbackLetter(auth.user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel className="py-0">
                    {auth.user.fullName}
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="font-light py-0">
                    {auth.user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <NavLink
                        end={true}
                        to="/profile"
                        className={({ isActive }) =>
                          cn(
                            "w-full inline-flex items-center justify-between",
                            isActive ? "text-green-600" : "text-gray-800"
                          )
                        }
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                      </NavLink>
                    </DropdownMenuItem>
                    {auth.user.role.role === "player" && (
                      <DropdownMenuItem>
                        <NavLink
                          end={true}
                          to="/playlist"
                          className={({ isActive }) =>
                            cn(
                              "w-full inline-flex items-center justify-between",
                              isActive ? "text-green-600" : "text-gray-800"
                            )
                          }
                        >
                          <History className="mr-2 h-4 w-4" />
                          <span>Playlists</span>
                          <DropdownMenuShortcut>⌘PL</DropdownMenuShortcut>
                        </NavLink>
                      </DropdownMenuItem>
                    )}
                    {auth.user.role.role !== "player" && (
                      <DropdownMenuItem>
                        <NavLink
                          end={true}
                          to="/dashboard"
                          className="w-full inline-flex items-center justify-between"
                        >
                          <Gauge className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                        </NavLink>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-rose-50 text-rose-600"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Fragment>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Button
                className="rounded-lg justify-self-end px-4 py-1 text-xs border-green-600 text-green-600 hover:text-green-700 hover:bg-green-100"
                variant="outline"
                asChild
              >
                <Link to="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                className="rounded-lg justify-self-end px-4 py-1 text-xs bg-green-600 hover:bg-green-500"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
          <div className={cn("block lg:hidden")}>
            <MobileSidebar />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderSection;
