import HomeLayout from "@/components/home-layout";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { Label } from "@/lib/utils/ui/label";
import { PiSoccerBall } from "react-icons/pi";
import { Link } from "react-router-dom";
import MissedChanceGif from "../assets/missed-chances.gif";

function LoginPage() {
  return (
    <HomeLayout>
      <div className="w-fit overflow-hidden mx-auto h-fit flex items-center justify-center rounded-md border shadow-lg my-10 divide-x">
        <img src={MissedChanceGif} alt="" />
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-start">
            <PiSoccerBall size={40} className="text-green-600" />
          </div>
          <div className="space-y-2 text-start">
            <h1 className="text-3xl font-bold">Login Your Account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="ml-auto text-sm text-green-600 underline"
                  to="/forget"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input id="password" required type="password" />
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-500"
              type="submit"
              asChild
            >
              <Link to="/dashboard">Sign in</Link>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline text-green-600" to="/register">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default LoginPage;
