/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sheet, SheetContent, SheetTrigger } from "@/lib/utils/ui/sheet";
import { Gauge, Home, MenuIcon, ShieldBan, Video } from "lucide-react";
import { TbSoccerField, TbPlayFootball } from "react-icons/tb";
import { Fragment, useEffect, useState } from "react";
import { Separator } from "@/lib/utils/ui/separator";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/lib/utils/ui/button";
import { PiSoccerBall } from "react-icons/pi";
import useAuth from "@/hooks/useAuth";
import { RiAdminLine } from "react-icons/ri";
import { GiSoccerKick } from "react-icons/gi";
import { TbCategory2 } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { FaChalkboardTeacher } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { auth }: any = useAuth();

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 1024 ? setOpen(false) : setOpen(open);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon size={30} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full !px-0">
          <div className="-translate-y-14 h-screen overflow-hidden overflow-y-scroll space-y-4 py-8 ">
            <div className="w-full h-14 inline-flex items-center gap-2 border-b px-4 text-green-600">
              <PiSoccerBall size={25} />
              <p className="italic font-semibold text-lg">Soccer</p>
            </div>
            <div className="py-2">
              <div className="space-y-1">
                <NavLink
                  end={true}
                  to="/"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  end={true}
                  to="/videos/genre/mid-filder"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <TbSoccerField className="mr-2 h-4 w-4" />
                  <span>Mid Filder</span>
                </NavLink>

                <NavLink
                  end={true}
                  to="/videos/genre/defense"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <ShieldBan className="mr-2 h-4 w-4" />
                  <span>Difense</span>
                </NavLink>

                <NavLink
                  to="/videos/genre/striker"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                      isActive ? "text-green-700" : "text-black"
                    )
                  }
                >
                  <TbPlayFootball className="mr-2 h-4 w-4" />
                  <span>Striker</span>
                </NavLink>
                {auth.isAuth && (
                  <Fragment>
                    {(auth.user.role.role == "admin" ||
                      auth.user.role.role == "coach") && (
                      <Fragment>
                        <Separator />
                        <NavLink
                          to="/dashboard"
                          end={true}
                          onClick={() => {
                            setOpen(false);
                          }}
                          className={({ isActive }) =>
                            cn(
                              "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                              isActive ? "text-green-700" : "text-black"
                            )
                          }
                        >
                          <Gauge className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </NavLink>
                        <NavLink
                          end={true}
                          to="/dashboard/genre"
                          onClick={() => {
                            setOpen(false);
                          }}
                          className={({ isActive }) =>
                            cn(
                              "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                              isActive ? "text-green-700" : "text-black"
                            )
                          }
                        >
                          <TbCategory2 className="mr-2 h-4 w-4" />
                          <span>Genres</span>
                        </NavLink>
                        <NavLink
                          end={true}
                          to="/dashboard/video"
                          onClick={() => {
                            setOpen(false);
                          }}
                          className={({ isActive }) =>
                            cn(
                              "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                              isActive ? "text-green-700" : "text-black"
                            )
                          }
                        >
                          <Video className="mr-2 h-4 w-4" />
                          <span>Videos</span>
                        </NavLink>
                        <NavLink
                          end={true}
                          to="/dashboard/player"
                          onClick={() => {
                            setOpen(false);
                          }}
                          className={({ isActive }) =>
                            cn(
                              "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                              isActive ? "text-green-700" : "text-black"
                            )
                          }
                        >
                          <GiSoccerKick className="mr-2 h-4 w-4" />
                          <span>Players</span>
                        </NavLink>
                      </Fragment>
                    )}
                    {auth.user.role.role == "admin" && (
                      <Fragment>
                        <NavLink
                          end={true}
                          to="/dashboard/coach"
                          onClick={() => {
                            setOpen(false);
                          }}
                          className={({ isActive }) =>
                            cn(
                              "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                              isActive ? "text-green-700" : "text-black"
                            )
                          }
                        >
                          <FaChalkboardTeacher className="mr-2 h-4 w-4" />
                          <span>Coaches</span>
                        </NavLink>
                        <NavLink
                          end={true}
                          to="/dashboard/admin"
                          onClick={() => {
                            setOpen(false);
                          }}
                          className={({ isActive }) =>
                            cn(
                              "group flex items-center rounded-md mx-2 px-3 py-2.5 text-sm font-medium hover:text-green-600",
                              isActive ? "text-green-700" : "text-black"
                            )
                          }
                        >
                          <RiAdminLine className="mr-2 h-4 w-4" />
                          <span>Admins</span>
                        </NavLink>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
              {!auth.isAuth && (
                <div className="grid grid-cols-2 gap-2 px-4 pt-6">
                  <Button
                    variant="default"
                    className="px-8 bg-green-600 text-white hover:bg-green-500"
                    onClick={() => {
                      setOpen(false);
                    }}
                    asChild
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 border-green-600 text-green-600 hover:bg-green-100 hover:text-green-600"
                    onClick={() => {
                      setOpen(false);
                    }}
                    asChild
                  >
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
