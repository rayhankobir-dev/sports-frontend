/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Gauge, Video } from "lucide-react";
import { TbCategory2, TbPlayFootball } from "react-icons/tb";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Fragment } from "react";
import useAuth from "@/hooks/useAuth";
import { RiAdminLine } from "react-icons/ri";

interface Props {
  className: string;
}

export function Sidebar({ className }: Props) {
  const { auth }: any = useAuth();
  return (
    <aside className={cn("", className, "md:hidden lg:block bg-gray-50")}>
      <div className="w-64 max-w-96 fixed top-14 left-0 h-full space-y-4 py-4 bg-slate">
        <ScrollArea className="h-full">
          <nav className="grid items-start gap-2">
            <NavLink
              end={true}
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-green-100 text-green-600" : "transparent"
                )
              }
            >
              <Gauge className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              end={true}
              to="/dashboard/genre"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:bg-green-50 hover:text-accent-foreground",
                  isActive ? "bg-green-100 text-green-600" : "transparent"
                )
              }
            >
              <TbCategory2 className="mr-2 h-4 w-4" />
              <span>Genres</span>
            </NavLink>
            <NavLink
              end={true}
              to="/dashboard/video"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:bg-green-50 hover:text-accent-foreground",
                  isActive ? "bg-green-100 text-green-600" : "transparent"
                )
              }
            >
              <Video className="mr-2 h-4 w-4" />
              <span>Videos</span>
            </NavLink>
            <NavLink
              end={true}
              to="/dashboard/player"
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:bg-green-50 hover:text-accent-foreground",
                  isActive ? "bg-green-100 text-green-600" : "transparent"
                )
              }
            >
              <TbPlayFootball className="mr-2 h-4 w-4" />
              <span>Players</span>
            </NavLink>
            {auth.user.role.role === "admin" && (
              <Fragment>
                <NavLink
                  end={true}
                  to="/dashboard/coach"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:bg-green-50 hover:text-accent-foreground",
                      isActive ? "bg-green-100 text-green-600" : "transparent"
                    )
                  }
                >
                  <FaChalkboardTeacher className="mr-2 h-4 w-4" />
                  <span>Coaches</span>
                </NavLink>
                <NavLink
                  end={true}
                  to="/dashboard/admin"
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:bg-green-50 hover:text-accent-foreground",
                      isActive ? "bg-green-100 text-green-600" : "transparent"
                    )
                  }
                >
                  <RiAdminLine className="mr-2 h-4 w-4" />
                  <span>Admins</span>
                </NavLink>
              </Fragment>
            )}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
