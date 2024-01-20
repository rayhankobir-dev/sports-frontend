import { Button } from "@/lib/utils/ui/button";
import { PiSoccerBall } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";

const activeLinkClass =
  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors text-green-600 hover:text-green-600 hover:text-green-600 focus:text-green-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50";
const defaultLinkClass =
  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 hover:text-green-600 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50";
function HeaderSection() {
  return (
    <header className="inset-x-0 top-0 z-50 w-full bg-white backdrop-blur-lg sticky border-b ">
      <head className="flex  sticky justify-between h-20 max-w-7xl mx-auto shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6 hidden lg:flex gap-2 text-green-600" to="/">
          <PiSoccerBall className="h-6 w-6" />
          <span className="italic font-semibold">Sports</span>
        </Link>
        <nav className="flex gap-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/videos"
          >
            Defense
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/videos"
          >
            Midfilder
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkClass : defaultLinkClass
            }
            to="/videos"
          >
            Striker
          </NavLink>
        </nav>
        <div className="flex gap-2">
          <Button
            className="justify-self-end px-4 py-1 text-xs border-green-600 text-green-600 hover:text-green-700 hover:bg-green-100"
            variant="outline"
            asChild
          >
            <Link to="/login">Sign in</Link>
          </Button>
          <Button
            asChild
            className="justify-self-end px-4 py-1 text-xs bg-green-600 hover:bg-green-500"
          >
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </head>
    </header>
  );
}

export default HeaderSection;
