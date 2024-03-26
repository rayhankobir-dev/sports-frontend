/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/utils/ui/form";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { PiSoccerBall } from "react-icons/pi";
import { Link, Navigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { authSchema } from "@/validation/auth.validation";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import SpinerLoading from "@/components/spiner-loading";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { MissGoalSvg } from "./register";
import { Helmet } from "react-helmet";

export type LoginFormData = z.infer<typeof authSchema.login>;

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const { publicAxios }: any = useAxios();
  const { auth, setAuth }: any = useAuth();

  // defining login form
  const loginForm = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(authSchema.login),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handle login form submission
  const onSubmit = async (credentials: LoginFormData) => {
    setLoading(true);
    try {
      const response = await publicAxios.post("/user/login", credentials);
      setAuth({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
        isAuth: true,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      toast.success(response.data.message);
      loginForm.reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (auth.isAuth) return <Navigate to="/" />;

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Your Account - Soccer Football Drills Platform</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-fit bg-green-600 overflow-hidden mx-auto h-fit flex md:grid grid-cols-2 lg:flex items-center justify-center rounded-md border shadow-lg my-10 md:divide-x">
        <MissGoalSvg />
        <div className="w-full h-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-start">
            <PiSoccerBall size={40} className="text-green-600" />
          </div>
          <div className="space-y-2 text-start">
            <h1 className="text-3xl font-bold">Login Your Account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="px-1 space-y-5 w-full relative"
            >
              <Button
                variant={"outline"}
                type="button"
                className="w-full rounded-xl h-11 space-x-3 text-gray-600 "
              >
                <FcGoogle size={20} />
                <p>Login with Google</p>
              </Button>
              <div className="space-y-2">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            autoComplete="true"
                            className="pl-12 h-12 rounded-xl"
                            disabled={loading}
                            placeholder="Email address"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-light px-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <div className="relative group">
                          <LockKeyhole className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            className="pl-12 h-12 rounded-xl "
                            type={passwordVisible ? "password" : "text"}
                            disabled={loading}
                            placeholder="Password"
                            {...field}
                          />
                          {passwordVisible ? (
                            <button className="block" type="button">
                              <Eye
                                onClick={() => {
                                  setPasswordVisible(false);
                                }}
                                className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                              />
                            </button>
                          ) : (
                            <button className="block" type="button">
                              <EyeOff
                                onClick={() => {
                                  setPasswordVisible(true);
                                }}
                                className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                              />
                            </button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="font-light px-1" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={loading}
                className="w-full h-11 rounded-xl bg-green-600 hover:bg-green-500"
                type="submit"
              >
                {loading ? (
                  <SpinerLoading
                    textHidden={false}
                    className="text-md text-white"
                    text="Authenticating"
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          <div className="inline-flex items-center gap-2 mt-4 text-center text-sm px-2">
            <p>Don't have an account?</p>
            <Link className="underline text-green-600" to="/register">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginPage;
