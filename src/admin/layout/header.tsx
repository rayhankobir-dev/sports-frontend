import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./nav";
import { Link } from "react-router-dom";
import { PiSoccerBall } from "react-icons/pi";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden md:block">
          <Link to={"/"} target="" className="flex gap-2 text-green-600">
            <PiSoccerBall size={25} />
            <h1 className="font-bold italic">Soccer</h1>
          </Link>
        </div>
        <div className={cn("block md:hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
