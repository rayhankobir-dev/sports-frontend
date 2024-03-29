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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/validation/auth.validation";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import SpinerLoading from "@/components/spiner-loading";
import * as z from "zod";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";

export type RegisterFormData = z.infer<typeof authSchema.register>;

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const { publicAxios }: any = useAxios();
  const { auth }: any = useAuth();
  const navigate = useNavigate();

  // defining login form
  const registerForm = useForm<RegisterFormData>({
    mode: "onChange",
    resolver: zodResolver(authSchema.register),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // handle register form submission
  const onSubmit = async (credentials: RegisterFormData) => {
    setLoading(true);
    try {
      const response = await publicAxios.post("/user/signup", credentials);
      toast.success(response.data.message);
      registerForm.reset();
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (auth.isAuth) return <Navigate to="/" />;

  return (
    <div className="w-fit bg-green-600 overflow-hidden mx-auto h-fit flex md:grid grid-cols-2 lg:flex items-center justify-center rounded-md border my-10 md:divide-x">
      <MissGoalSvg />
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-start">
          <PiSoccerBall size={40} className="text-green-600" />
        </div>
        <div className="space-y-2 text-start">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
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
                control={registerForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="col-span-1 ">
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          autoComplete="true"
                          className="pl-12 h-12 rounded-xl"
                          disabled={loading}
                          placeholder="Full name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-light px-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
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
                  className="text-md text-white"
                  text="Authenticating"
                />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
        <div className="inline-flex items-center gap-2 mt-4 text-center text-sm px-2">
          <p>Already have an account?</p>
          <Link className="underline text-green-600" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MissGoalSvg() {
  return (
    <svg
      className="w-[500px] hidden md:block"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
    >
      <g id="freepik--background-complete--inject-252">
        <path
          d="M102,155.8s0-.17,0-.5,0-.83,0-1.47c0-1.29,0-3.19,0-5.63,0-4.89,0-12,0-20.72,0-17.52,0-41.8.06-68.92l-.15.16h6.36l-.16-.16c0,44.61.09,82.51.1,96.44l.05-.06-4.75.64-1.2.16-.4.06.39,0,1.18-.13,4.79-.58h.05v0c0-13.93,0-51.83.1-96.44v-.15h-6.66v.15c0,27.17,0,51.49.06,69,0,8.75,0,15.81,0,20.69,0,2.42,0,4.3,0,5.58,0,.63,0,1.12,0,1.45S102,155.8,102,155.8Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M66.93,155.52s0-.17,0-.5,0-.83,0-1.47c0-1.28,0-3.17,0-5.6,0-4.88,0-11.92,0-20.66,0-17.46,0-41.68.07-68.73l-.16.16h6.16l-.16-.16c0,45,.09,83.26.11,97l0-.05-4.61,0h0l4.64,0h0v0c0-13.7,0-52,.1-97v-.15H66.78v.15c0,27.09,0,51.35.06,68.84,0,8.73,0,15.76,0,20.62,0,2.42,0,4.3,0,5.58,0,.62,0,1.11,0,1.44S66.93,155.52,66.93,155.52Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M50.67,97.23c0,.09,16.72.16,37.33.16s37.34-.07,37.34-.16-16.71-.15-37.34-.15S50.67,97.15,50.67,97.23Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M50.67,85.57c0,.09,16.72.15,37.33.15s37.34-.06,37.34-.15-16.71-.15-37.34-.15S50.67,85.48,50.67,85.57Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M50.67,73.91c0,.09,16.72.15,37.33.15s37.34-.06,37.34-.15-16.71-.15-37.34-.15S50.67,73.82,50.67,73.91Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M50.67,62.25c0,.08,16.72.15,37.33.15s37.34-.07,37.34-.15-16.71-.16-37.34-.16S50.67,62.16,50.67,62.25Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M119.68,97.85A4.86,4.86,0,1,0,124.54,93,4.86,4.86,0,0,0,119.68,97.85Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M119.38,97.85a5.16,5.16,0,1,1,5.16,5.16A5.16,5.16,0,0,1,119.38,97.85Zm.6,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,120,97.85Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="112.19"
          cy="97.85"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M107,97.85a5.16,5.16,0,1,1,5.15,5.16A5.16,5.16,0,0,1,107,97.85Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,107.63,97.85Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M95,97.85A4.86,4.86,0,1,0,99.84,93,4.86,4.86,0,0,0,95,97.85Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M94.69,97.85A5.16,5.16,0,1,1,99.84,103,5.16,5.16,0,0,1,94.69,97.85Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,95.28,97.85Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="87.49"
          cy="97.85"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M82.34,97.85A5.16,5.16,0,1,1,87.49,103,5.16,5.16,0,0,1,82.34,97.85Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,82.93,97.85Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M70.29,97.85A4.86,4.86,0,1,0,75.15,93,4.85,4.85,0,0,0,70.29,97.85Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M70,97.85A5.16,5.16,0,1,1,75.15,103,5.16,5.16,0,0,1,70,97.85Zm.59,0a4.57,4.57,0,1,0,4.57-4.56A4.58,4.58,0,0,0,70.58,97.85Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="62.8"
          cy="97.85"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M57.64,97.85A5.16,5.16,0,1,1,62.8,103,5.16,5.16,0,0,1,57.64,97.85Zm.59,0a4.57,4.57,0,1,0,4.57-4.56A4.58,4.58,0,0,0,58.23,97.85Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="50.45"
          cy="97.85"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M45.29,97.85A5.16,5.16,0,1,1,50.45,103,5.16,5.16,0,0,1,45.29,97.85Zm.59,0a4.57,4.57,0,1,0,4.57-4.56A4.58,4.58,0,0,0,45.88,97.85Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="112.19"
          cy="85.89"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M107,85.89A5.16,5.16,0,1,1,112.19,91,5.16,5.16,0,0,1,107,85.89Zm.59,0a4.57,4.57,0,1,0,4.56-4.57A4.57,4.57,0,0,0,107.63,85.89Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M95,85.89A4.86,4.86,0,1,0,99.84,81,4.87,4.87,0,0,0,95,85.89Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M94.69,85.89A5.16,5.16,0,1,1,99.84,91,5.16,5.16,0,0,1,94.69,85.89Zm.59,0a4.57,4.57,0,1,0,4.56-4.57A4.57,4.57,0,0,0,95.28,85.89Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="87.49"
          cy="85.89"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M82.34,85.89A5.16,5.16,0,1,1,87.49,91,5.16,5.16,0,0,1,82.34,85.89Zm.59,0a4.57,4.57,0,1,0,4.56-4.57A4.57,4.57,0,0,0,82.93,85.89Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M70.29,85.89A4.86,4.86,0,1,0,75.15,81,4.86,4.86,0,0,0,70.29,85.89Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M70,85.89A5.16,5.16,0,1,1,75.15,91,5.16,5.16,0,0,1,70,85.89Zm.59,0a4.57,4.57,0,1,0,4.57-4.57A4.57,4.57,0,0,0,70.58,85.89Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="62.8"
          cy="85.89"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M57.64,85.89A5.16,5.16,0,1,1,62.8,91,5.16,5.16,0,0,1,57.64,85.89Zm.59,0a4.57,4.57,0,1,0,4.57-4.57A4.57,4.57,0,0,0,58.23,85.89Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="50.45"
          cy="85.89"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M45.29,85.89A5.16,5.16,0,1,1,50.45,91,5.16,5.16,0,0,1,45.29,85.89Zm.59,0a4.57,4.57,0,1,0,4.57-4.57A4.57,4.57,0,0,0,45.88,85.89Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M119.68,85.75a4.86,4.86,0,1,0,4.86-4.86A4.87,4.87,0,0,0,119.68,85.75Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M119.38,85.75a5.16,5.16,0,1,1,5.16,5.16A5.17,5.17,0,0,1,119.38,85.75Zm.6,0a4.57,4.57,0,1,0,4.56-4.56A4.56,4.56,0,0,0,120,85.75Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="112.19"
          cy="74.06"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M107,74.06a5.16,5.16,0,1,1,5.15,5.16A5.16,5.16,0,0,1,107,74.06Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,107.63,74.06Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M95,74.06a4.86,4.86,0,1,0,4.86-4.86A4.86,4.86,0,0,0,95,74.06Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M94.69,74.06a5.16,5.16,0,1,1,5.15,5.16A5.16,5.16,0,0,1,94.69,74.06Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,95.28,74.06Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="87.49"
          cy="74.06"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M82.34,74.06a5.16,5.16,0,1,1,5.15,5.16A5.16,5.16,0,0,1,82.34,74.06Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,82.93,74.06Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M70.29,74.06a4.86,4.86,0,1,0,4.86-4.86A4.85,4.85,0,0,0,70.29,74.06Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M70,74.06a5.16,5.16,0,1,1,5.16,5.16A5.16,5.16,0,0,1,70,74.06Zm.59,0a4.57,4.57,0,1,0,4.57-4.56A4.58,4.58,0,0,0,70.58,74.06Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="62.8"
          cy="74.06"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M57.64,74.06a5.16,5.16,0,1,1,5.16,5.16A5.16,5.16,0,0,1,57.64,74.06Zm.59,0A4.57,4.57,0,1,0,62.8,69.5,4.58,4.58,0,0,0,58.23,74.06Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="50.45"
          cy="74.06"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M45.29,74.06a5.16,5.16,0,1,1,5.16,5.16A5.16,5.16,0,0,1,45.29,74.06Zm.59,0a4.57,4.57,0,1,0,4.57-4.56A4.58,4.58,0,0,0,45.88,74.06Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M119.68,73.93a4.86,4.86,0,1,0,4.86-4.86A4.87,4.87,0,0,0,119.68,73.93Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M119.38,73.93a5.16,5.16,0,1,1,5.16,5.16A5.17,5.17,0,0,1,119.38,73.93Zm.6,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,120,73.93Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="112.19"
          cy="62.24"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M107,62.24a5.16,5.16,0,1,1,5.15,5.16A5.16,5.16,0,0,1,107,62.24Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,107.63,62.24Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M95,62.24a4.86,4.86,0,1,0,4.86-4.86A4.86,4.86,0,0,0,95,62.24Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M94.69,62.24a5.16,5.16,0,1,1,5.15,5.16A5.16,5.16,0,0,1,94.69,62.24Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,95.28,62.24Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="87.49"
          cy="62.24"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M82.34,62.24a5.16,5.16,0,1,1,5.15,5.16A5.16,5.16,0,0,1,82.34,62.24Zm.59,0a4.57,4.57,0,1,0,4.56-4.56A4.57,4.57,0,0,0,82.93,62.24Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M70.29,62.24a4.86,4.86,0,1,0,4.86-4.86A4.85,4.85,0,0,0,70.29,62.24Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M70,62.24a5.16,5.16,0,1,1,5.16,5.16A5.16,5.16,0,0,1,70,62.24Zm.59,0a4.57,4.57,0,1,0,4.57-4.56A4.58,4.58,0,0,0,70.58,62.24Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="62.8"
          cy="62.24"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M57.64,62.24A5.16,5.16,0,1,1,62.8,67.4,5.16,5.16,0,0,1,57.64,62.24Zm.59,0a4.57,4.57,0,1,0,4.57-4.56A4.58,4.58,0,0,0,58.23,62.24Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="50.45"
          cy="62.24"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M45.29,62.24a5.16,5.16,0,1,1,5.16,5.16A5.16,5.16,0,0,1,45.29,62.24Zm.59,0a4.57,4.57,0,1,0,4.57-4.56A4.58,4.58,0,0,0,45.88,62.24Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M119.68,62.11a4.86,4.86,0,1,0,4.86-4.86A4.87,4.87,0,0,0,119.68,62.11Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M119.38,62.11a5.16,5.16,0,1,1,5.16,5.15A5.17,5.17,0,0,1,119.38,62.11Zm.6,0a4.57,4.57,0,1,0,4.56-4.57A4.57,4.57,0,0,0,120,62.11Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <rect
          x="19.03"
          y="144.97"
          width="50.59"
          height="74.11"
          transform="translate(88.66 364.06) rotate(180)"
          style={{ fill: "#f5f5f5" }}
        ></rect>
        <rect
          x="23.38"
          y="147.14"
          width="42.29"
          height="9.88"
          transform="translate(89.05 304.16) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="26.54 144.97 31 157.02 23.38 157.02 23.38 144.97 26.54 144.97"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="23.38"
          y="159.18"
          width="42.29"
          height="9.88"
          transform="translate(89.05 328.24) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="26.54 157.02 31 169.06 23.38 169.06 23.38 157.02 26.54 157.02"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="23.38"
          y="171.46"
          width="42.29"
          height="9.88"
          transform="translate(89.05 352.81) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="26.54 169.3 31 181.34 23.38 181.34 23.38 169.3 26.54 169.3"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="23.38"
          y="183.49"
          width="42.29"
          height="9.88"
          transform="translate(89.05 376.86) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="26.54 181.32 31 193.37 23.38 193.37 23.38 181.32 26.54 181.32"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="23.38"
          y="195.52"
          width="42.29"
          height="9.88"
          transform="translate(89.05 400.91) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="26.54 193.35 31 205.4 23.38 205.4 23.38 193.35 26.54 193.35"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="23.38"
          y="207.54"
          width="42.29"
          height="9.88"
          transform="translate(89.05 424.97) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="26.54 205.38 31 217.42 23.38 217.42 23.38 205.38 26.54 205.38"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="69.62"
          y="177.17"
          width="202.06"
          height="2.41"
          transform="translate(341.3 356.75) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <rect
          x="69.62"
          y="179.66"
          width="202.06"
          height="17.07"
          transform="translate(341.3 376.38) rotate(180)"
          style={{ fill: "#f5f5f5" }}
        ></rect>
        <rect
          x="69.45"
          y="198.54"
          width="202.06"
          height="17.07"
          transform="translate(340.96 414.15) rotate(180)"
          style={{ fill: "#f5f5f5" }}
        ></rect>
        <rect
          x="69.62"
          y="153.89"
          width="202.06"
          height="23.19"
          transform="translate(341.3 330.97) rotate(180)"
          style={{ fill: "#f5f5f5" }}
        ></rect>
        <rect
          x="69.62"
          y="151.77"
          width="202.06"
          height="2.41"
          transform="translate(341.3 305.94) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <rect
          x="69.45"
          y="196.02"
          width="202.06"
          height="2.41"
          transform="translate(340.96 394.44) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <rect
          x="19.03"
          y="215"
          width="252.47"
          height="31.28"
          transform="translate(290.54 461.28) rotate(180)"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <path
          d="M398,155.8s0-.17,0-.5,0-.83,0-1.47c0-1.29,0-3.19,0-5.63,0-4.89,0-12-.05-20.72,0-17.52,0-41.8-.06-68.92l.15.16h-6.36l.16-.16c0,44.61-.09,82.51-.1,96.44l-.05-.06,4.75.64,1.2.16.4.06-.39,0-1.18-.13-4.79-.58h-.05v0c0-13.93-.05-51.83-.1-96.44v-.15h6.66v.15c0,27.17-.05,51.49-.06,69,0,8.75,0,15.81-.05,20.69,0,2.42,0,4.3,0,5.58,0,.63,0,1.12,0,1.45S398,155.8,398,155.8Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M433.07,155.52s0-.17,0-.5,0-.83,0-1.47c0-1.28,0-3.17,0-5.6,0-4.88,0-11.92,0-20.66,0-17.46,0-41.68-.07-68.73l.16.16h-6.16l.16-.16c-.05,45-.09,83.26-.11,97l0-.05,4.61,0h0l-4.64,0h-.05v0c0-13.7-.05-52-.1-97v-.15h6.46v.15c0,27.09-.05,51.35-.06,68.84,0,8.73,0,15.76-.05,20.62,0,2.42,0,4.3,0,5.58,0,.62,0,1.11,0,1.44S433.07,155.52,433.07,155.52Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M449.33,97.23c0,.09-16.72.16-37.33.16s-37.34-.07-37.34-.16,16.71-.15,37.34-.15S449.33,97.15,449.33,97.23Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M449.33,85.57c0,.09-16.72.15-37.33.15s-37.34-.06-37.34-.15,16.71-.15,37.34-.15S449.33,85.48,449.33,85.57Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M449.33,73.91c0,.09-16.72.15-37.33.15s-37.34-.06-37.34-.15,16.71-.15,37.34-.15S449.33,73.82,449.33,73.91Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M449.33,62.25c0,.08-16.72.15-37.33.15s-37.34-.07-37.34-.15,16.71-.16,37.34-.16S449.33,62.16,449.33,62.25Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M380.32,97.85A4.86,4.86,0,1,1,375.46,93,4.86,4.86,0,0,1,380.32,97.85Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M375.46,103a5.16,5.16,0,1,1,5.16-5.16A5.16,5.16,0,0,1,375.46,103Zm0-9.72A4.57,4.57,0,1,0,380,97.85,4.57,4.57,0,0,0,375.46,93.29Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="387.81"
          cy="97.85"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M387.81,103A5.16,5.16,0,1,1,393,97.85,5.16,5.16,0,0,1,387.81,103Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,387.81,93.29Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M405,97.85A4.86,4.86,0,1,1,400.16,93,4.86,4.86,0,0,1,405,97.85Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M400.16,103a5.16,5.16,0,1,1,5.15-5.16A5.16,5.16,0,0,1,400.16,103Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,400.16,93.29Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="412.51"
          cy="97.85"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M412.51,103a5.16,5.16,0,1,1,5.15-5.16A5.16,5.16,0,0,1,412.51,103Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,412.51,93.29Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M429.71,97.85A4.86,4.86,0,1,1,424.85,93,4.85,4.85,0,0,1,429.71,97.85Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M424.85,103A5.16,5.16,0,1,1,430,97.85,5.16,5.16,0,0,1,424.85,103Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,424.85,93.29Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="437.2"
          cy="97.85"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M437.2,103a5.16,5.16,0,1,1,5.16-5.16A5.16,5.16,0,0,1,437.2,103Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,437.2,93.29Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="449.55"
          cy="97.85"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M449.55,103a5.16,5.16,0,1,1,5.16-5.16A5.17,5.17,0,0,1,449.55,103Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,449.55,93.29Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="387.81"
          cy="85.89"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M387.81,91A5.16,5.16,0,1,1,393,85.89,5.16,5.16,0,0,1,387.81,91Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,387.81,81.32Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M405,85.89A4.86,4.86,0,1,1,400.16,81,4.87,4.87,0,0,1,405,85.89Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M400.16,91a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,400.16,91Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,400.16,81.32Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="412.51"
          cy="85.89"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M412.51,91a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,412.51,91Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,412.51,81.32Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M429.71,85.89A4.86,4.86,0,1,1,424.85,81,4.86,4.86,0,0,1,429.71,85.89Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M424.85,91A5.16,5.16,0,1,1,430,85.89,5.16,5.16,0,0,1,424.85,91Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,424.85,81.32Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="437.2"
          cy="85.89"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M437.2,91a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,437.2,91Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,437.2,81.32Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="449.55"
          cy="85.89"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M449.55,91a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,449.55,91Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,449.55,81.32Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M380.32,85.75a4.86,4.86,0,1,1-4.86-4.86A4.87,4.87,0,0,1,380.32,85.75Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M375.46,90.91a5.16,5.16,0,1,1,5.16-5.16A5.17,5.17,0,0,1,375.46,90.91Zm0-9.72A4.56,4.56,0,1,0,380,85.75,4.57,4.57,0,0,0,375.46,81.19Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="387.81"
          cy="74.06"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M387.81,79.22A5.16,5.16,0,1,1,393,74.06,5.16,5.16,0,0,1,387.81,79.22Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,387.81,69.5Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M405,74.06a4.86,4.86,0,1,1-4.86-4.86A4.86,4.86,0,0,1,405,74.06Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M400.16,79.22a5.16,5.16,0,1,1,5.15-5.16A5.16,5.16,0,0,1,400.16,79.22Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,400.16,69.5Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="412.51"
          cy="74.06"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M412.51,79.22a5.16,5.16,0,1,1,5.15-5.16A5.16,5.16,0,0,1,412.51,79.22Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,412.51,69.5Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M429.71,74.06a4.86,4.86,0,1,1-4.86-4.86A4.85,4.85,0,0,1,429.71,74.06Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M424.85,79.22A5.16,5.16,0,1,1,430,74.06,5.16,5.16,0,0,1,424.85,79.22Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,424.85,69.5Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="437.2"
          cy="74.06"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M437.2,79.22a5.16,5.16,0,1,1,5.16-5.16A5.16,5.16,0,0,1,437.2,79.22Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,437.2,69.5Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="449.55"
          cy="74.06"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M449.55,79.22a5.16,5.16,0,1,1,5.16-5.16A5.17,5.17,0,0,1,449.55,79.22Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,449.55,69.5Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M380.32,73.93a4.86,4.86,0,1,1-4.86-4.86A4.87,4.87,0,0,1,380.32,73.93Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M375.46,79.09a5.16,5.16,0,1,1,5.16-5.16A5.17,5.17,0,0,1,375.46,79.09Zm0-9.72A4.56,4.56,0,1,0,380,73.93,4.57,4.57,0,0,0,375.46,69.37Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="387.81"
          cy="62.24"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M387.81,67.4A5.16,5.16,0,1,1,393,62.24,5.16,5.16,0,0,1,387.81,67.4Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,387.81,57.68Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M405,62.24a4.86,4.86,0,1,1-4.86-4.86A4.86,4.86,0,0,1,405,62.24Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M400.16,67.4a5.16,5.16,0,1,1,5.15-5.16A5.16,5.16,0,0,1,400.16,67.4Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,400.16,57.68Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="412.51"
          cy="62.24"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M412.51,67.4a5.16,5.16,0,1,1,5.15-5.16A5.16,5.16,0,0,1,412.51,67.4Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,412.51,57.68Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M429.71,62.24a4.86,4.86,0,1,1-4.86-4.86A4.85,4.85,0,0,1,429.71,62.24Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M424.85,67.4A5.16,5.16,0,1,1,430,62.24,5.16,5.16,0,0,1,424.85,67.4Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,424.85,57.68Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="437.2"
          cy="62.24"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M437.2,67.4a5.16,5.16,0,1,1,5.16-5.16A5.16,5.16,0,0,1,437.2,67.4Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,437.2,57.68Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="449.55"
          cy="62.24"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M449.55,67.4a5.16,5.16,0,1,1,5.16-5.16A5.17,5.17,0,0,1,449.55,67.4Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,449.55,57.68Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M380.32,62.11a4.86,4.86,0,1,1-4.86-4.86A4.87,4.87,0,0,1,380.32,62.11Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M375.46,67.26a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,375.46,67.26Zm0-9.72A4.57,4.57,0,1,0,380,62.11,4.58,4.58,0,0,0,375.46,57.54Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M224.79,158.41s0-.17,0-.51,0-.84,0-1.49c0-1.31,0-3.24,0-5.71,0-5,0-12.15-.05-21.06,0-17.8,0-42.48-.07-70.06l.16.16h-6.36l.16-.16c-.05,45.83-.09,84.78-.1,98.83l-.06,0,4.76,0,1.2,0h0l-1.18,0-4.79,0h-.05v-.06c0-14,0-53-.1-98.83v-.15h6.66v.15c0,27.62,0,52.35-.06,70.17,0,8.9,0,16.07,0,21,0,2.47,0,4.38,0,5.68,0,.64,0,1.13,0,1.47S224.79,158.41,224.79,158.41Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M259.88,158.41s0-.17,0-.51l0-1.49c0-1.31,0-3.24,0-5.72,0-5,0-12.15,0-21.06,0-17.8,0-42.48-.07-70l.16.16h-6.16l.16-.16c0,46-.09,85-.11,98.83l-.05,0,4.62,0,1.15,0h0l-1.15,0-4.64,0h-.05v-.06c0-13.84-.06-52.87-.1-98.83v-.15H260v.15c0,27.61,0,52.34-.06,70.17,0,8.89,0,16.06-.05,21,0,2.47,0,4.38,0,5.68,0,.64,0,1.13,0,1.47S259.88,158.41,259.88,158.41Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M276.14,98.25c0,.09-16.72.16-37.33.16s-37.34-.07-37.34-.16,16.71-.15,37.34-.15S276.14,98.17,276.14,98.25Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M276.14,86.59c0,.09-16.72.16-37.33.16s-37.34-.07-37.34-.16,16.71-.15,37.34-.15S276.14,86.51,276.14,86.59Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M276.14,74.93c0,.09-16.72.16-37.33.16s-37.34-.07-37.34-.16,16.71-.15,37.34-.15S276.14,74.85,276.14,74.93Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M276.14,63.27c0,.09-16.72.15-37.33.15s-37.34-.06-37.34-.15,16.71-.15,37.34-.15S276.14,63.18,276.14,63.27Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M207.13,98.88A4.86,4.86,0,1,1,202.27,94,4.87,4.87,0,0,1,207.13,98.88Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M202.27,104a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,202.27,104Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,202.27,94.31Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M219.48,98.88A4.86,4.86,0,1,1,214.62,94,4.87,4.87,0,0,1,219.48,98.88Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M214.62,104a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,214.62,104Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,214.62,94.31Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M231.83,98.88A4.86,4.86,0,1,1,227,94,4.87,4.87,0,0,1,231.83,98.88Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M227,104a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,227,104Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,227,94.31Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M244.17,98.88A4.86,4.86,0,1,1,239.31,94,4.86,4.86,0,0,1,244.17,98.88Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M239.31,104a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,239.31,104Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,239.31,94.31Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M256.52,98.88A4.86,4.86,0,1,1,251.66,94,4.86,4.86,0,0,1,256.52,98.88Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M251.66,104a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,251.66,104Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,251.66,94.31Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M268.87,98.88A4.86,4.86,0,1,1,264,94,4.86,4.86,0,0,1,268.87,98.88Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M264,104a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,264,104Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,264,94.31Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M281.22,98.88A4.86,4.86,0,1,1,276.36,94,4.86,4.86,0,0,1,281.22,98.88Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M276.36,104a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,276.36,104Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.57,4.57,0,0,0,276.36,94.31Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M219.48,86.91a4.86,4.86,0,1,1-4.86-4.86A4.87,4.87,0,0,1,219.48,86.91Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M214.62,92.06a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,214.62,92.06Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,214.62,82.34Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M231.83,86.91A4.86,4.86,0,1,1,227,82.05,4.87,4.87,0,0,1,231.83,86.91Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M227,92.06a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,227,92.06Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,227,82.34Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M244.17,86.91a4.86,4.86,0,1,1-4.86-4.86A4.86,4.86,0,0,1,244.17,86.91Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M239.31,92.06a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,239.31,92.06Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,239.31,82.34Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M256.52,86.91a4.86,4.86,0,1,1-4.86-4.86A4.86,4.86,0,0,1,256.52,86.91Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M251.66,92.06a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,251.66,92.06Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,251.66,82.34Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M268.87,86.91A4.86,4.86,0,1,1,264,82.05,4.86,4.86,0,0,1,268.87,86.91Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M264,92.06a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,264,92.06Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,264,82.34Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M281.22,86.91a4.86,4.86,0,1,1-4.86-4.86A4.86,4.86,0,0,1,281.22,86.91Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M276.36,92.06a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,276.36,92.06Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.57,4.57,0,0,0,276.36,82.34Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M207.13,86.77a4.86,4.86,0,1,1-4.86-4.86A4.87,4.87,0,0,1,207.13,86.77Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M202.27,91.93a5.16,5.16,0,1,1,5.15-5.16A5.17,5.17,0,0,1,202.27,91.93Zm0-9.72a4.56,4.56,0,1,0,4.56,4.56A4.57,4.57,0,0,0,202.27,82.21Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="214.62"
          cy="75.09"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M214.62,80.24a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,214.62,80.24Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,214.62,70.52Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="226.97"
          cy="75.09"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M227,80.24a5.16,5.16,0,1,1,5.15-5.15A5.16,5.16,0,0,1,227,80.24Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,227,70.52Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="239.31"
          cy="75.09"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M239.31,80.24a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,239.31,80.24Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,239.31,70.52Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="251.66"
          cy="75.09"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M251.66,80.24a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,251.66,80.24Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,251.66,70.52Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M268.87,75.09A4.86,4.86,0,1,1,264,70.22,4.86,4.86,0,0,1,268.87,75.09Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M264,80.24a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,264,80.24Zm0-9.72a4.57,4.57,0,1,0,4.57,4.57A4.57,4.57,0,0,0,264,70.52Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="276.36"
          cy="75.09"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M276.36,80.24a5.16,5.16,0,1,1,5.16-5.15A5.16,5.16,0,0,1,276.36,80.24Zm0-9.72a4.57,4.57,0,1,0,4.56,4.57A4.57,4.57,0,0,0,276.36,70.52Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M207.13,75a4.86,4.86,0,1,1-4.86-4.86A4.87,4.87,0,0,1,207.13,75Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M202.27,80.11A5.16,5.16,0,1,1,207.42,75,5.17,5.17,0,0,1,202.27,80.11Zm0-9.72A4.56,4.56,0,1,0,206.83,75,4.57,4.57,0,0,0,202.27,70.39Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="214.62"
          cy="63.26"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M214.62,68.42a5.16,5.16,0,1,1,5.15-5.16A5.16,5.16,0,0,1,214.62,68.42Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,214.62,58.7Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="226.97"
          cy="63.26"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M227,68.42a5.16,5.16,0,1,1,5.15-5.16A5.16,5.16,0,0,1,227,68.42Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,227,58.7Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="239.31"
          cy="63.26"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M239.31,68.42a5.16,5.16,0,1,1,5.16-5.16A5.16,5.16,0,0,1,239.31,68.42Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,239.31,58.7Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="251.66"
          cy="63.26"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M251.66,68.42a5.16,5.16,0,1,1,5.16-5.16A5.16,5.16,0,0,1,251.66,68.42Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,251.66,58.7Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M268.87,63.26A4.86,4.86,0,1,1,264,58.4,4.85,4.85,0,0,1,268.87,63.26Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M264,68.42a5.16,5.16,0,1,1,5.16-5.16A5.16,5.16,0,0,1,264,68.42Zm0-9.72a4.57,4.57,0,1,0,4.57,4.56A4.57,4.57,0,0,0,264,58.7Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <circle
          cx="276.36"
          cy="63.26"
          r="4.86"
          style={{ fill: "#fafafa" }}
        ></circle>
        <path
          d="M276.36,68.42a5.16,5.16,0,1,1,5.16-5.16A5.17,5.17,0,0,1,276.36,68.42Zm0-9.72a4.57,4.57,0,1,0,4.56,4.56A4.57,4.57,0,0,0,276.36,58.7Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M207.13,63.13a4.86,4.86,0,1,1-4.86-4.86A4.87,4.87,0,0,1,207.13,63.13Z"
          style={{ fill: "#fafafa" }}
        ></path>
        <path
          d="M202.27,68.29a5.16,5.16,0,1,1,5.15-5.16A5.17,5.17,0,0,1,202.27,68.29Zm0-9.73a4.57,4.57,0,1,0,4.56,4.57A4.58,4.58,0,0,0,202.27,58.56Z"
          style={{ fill: "#ebebeb" }}
        ></path>
        <rect
          x="430.38"
          y="144.97"
          width="50.59"
          height="74.11"
          style={{ fill: "#f5f5f5" }}
        ></rect>
        <rect
          x="434.33"
          y="147.14"
          width="42.29"
          height="9.88"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="473.46 144.97 469 157.02 476.62 157.02 476.62 144.97 473.46 144.97"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="434.33"
          y="159.18"
          width="42.29"
          height="9.88"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="473.46 157.02 469 169.06 476.62 169.06 476.62 157.02 473.46 157.02"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="434.33"
          y="171.46"
          width="42.29"
          height="9.88"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="473.46 169.3 469 181.34 476.62 181.34 476.62 169.3 473.46 169.3"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="434.33"
          y="183.49"
          width="42.29"
          height="9.88"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="473.46 181.32 469 193.37 476.62 193.37 476.62 181.32 473.46 181.32"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="434.33"
          y="195.52"
          width="42.29"
          height="9.88"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="473.46 193.35 469 205.4 476.62 205.4 476.62 193.35 473.46 193.35"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="434.33"
          y="207.54"
          width="42.29"
          height="9.88"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <polygon
          points="473.46 205.38 469 217.42 476.62 217.42 476.62 205.38 473.46 205.38"
          style={{ fill: "#e0e0e0" }}
        ></polygon>
        <rect
          x="228.32"
          y="177.17"
          width="202.06"
          height="2.41"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <rect
          x="228.32"
          y="179.66"
          width="202.06"
          height="17.07"
          style={{ fill: "#f5f5f5" }}
        ></rect>
        <rect
          x="228.49"
          y="198.54"
          width="202.06"
          height="17.07"
          style={{ fill: "#f5f5f5" }}
        ></rect>
        <rect
          x="228.32"
          y="153.89"
          width="202.06"
          height="23.19"
          style={{ fill: "#f5f5f5" }}
        ></rect>
        <rect
          x="228.32"
          y="151.77"
          width="202.06"
          height="2.41"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <rect
          x="228.49"
          y="196.02"
          width="202.06"
          height="2.41"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <rect
          x="228.49"
          y="215"
          width="252.47"
          height="31.28"
          style={{ fill: "#ebebeb" }}
        ></rect>
        <path
          d="M84.11,292.26c.11-.1,18.48,20.62,41,46.27s40.76,46.52,40.65,46.61-18.48-20.62-41-46.27S84,292.35,84.11,292.26Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M133.59,321.45c-.1.1-12-10.9-26.46-24.57S80.92,272,81,271.94,93,282.83,107.48,296.5,133.69,321.34,133.59,321.45Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M151.81,42.23h46.86s-4.14-7.55-16.21-6.45c-11.52,1-12.1-3.71-18-4.29S153.76,35.39,151.81,42.23Z"
          style={{ fill: "#f5f5f5" }}
        ></path>
        <path
          d="M184.51,29.22h46.86s-4.14-7.54-16.2-6.44c-11.52,1-12.11-3.71-18-4.29S186.46,22.39,184.51,29.22Z"
          style={{ fill: "#f5f5f5" }}
        ></path>
        <path
          d="M47.66,397.33a29.36,29.36,0,0,1,2.8,4.8,31,31,0,0,1,2.33,5,29.52,29.52,0,0,1-2.8-4.79A30.91,30.91,0,0,1,47.66,397.33Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M52.64,396.85a27.2,27.2,0,0,1,2,4.82,27,27,0,0,1,1.48,5,25.56,25.56,0,0,1-2-4.82A25.34,25.34,0,0,1,52.64,396.85Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M58.47,395.1a77.43,77.43,0,0,1,0,12.68,77.43,77.43,0,0,1,0-12.68Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M160,469.41a52.63,52.63,0,0,1,2.36,7.11,55.49,55.49,0,0,1,1.87,7.25,53.44,53.44,0,0,1-2.37-7.11A54.41,54.41,0,0,1,160,469.41Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M167.31,470c.16,0-.14,3,.08,6.65s.81,6.57.65,6.6a6.58,6.58,0,0,1-.56-1.88A32,32,0,0,1,167,472,7.06,7.06,0,0,1,167.31,470Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M171.91,470a47.84,47.84,0,0,1-1.73,9.79,24,24,0,0,1,.61-4.94A24.3,24.3,0,0,1,171.91,470Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M196.79,355.91a15.81,15.81,0,0,1,2.24,3.33,14.84,14.84,0,0,1,1.79,3.59,16.27,16.27,0,0,1-2.24-3.33A16,16,0,0,1,196.79,355.91Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M202.5,355.32a31.93,31.93,0,0,0-.16,3.79,30.39,30.39,0,0,0,.82,3.7,7.54,7.54,0,0,1-.66-7.49Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M207.82,350.15a64.08,64.08,0,0,1-.54,11.53,31.45,31.45,0,0,1,0-5.78A32.68,32.68,0,0,1,207.82,350.15Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M207.74,277a42.16,42.16,0,0,1,3.46,8.65,20.48,20.48,0,0,1-2-4.23A21,21,0,0,1,207.74,277Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M213.31,277a22.26,22.26,0,0,1,.87,4.86,23.89,23.89,0,0,1,.36,4.92,47.43,47.43,0,0,1-1.23-9.78Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M221,276.35c.13.08-1,1.82-1.77,4.22s-.88,4.46-1,4.45a12,12,0,0,1,2.81-8.67Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M397.35,302.89a35.68,35.68,0,0,1-2.82-5.37,34.71,34.71,0,0,1-2.36-5.58A35.78,35.78,0,0,1,395,297.3,35,35,0,0,1,397.35,302.89Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M401.39,301.16a37.41,37.41,0,0,1-2.2-5.7,36.38,36.38,0,0,1-1.72-5.87,70.78,70.78,0,0,1,3.92,11.57Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M405.42,302.89a7.42,7.42,0,0,1-.31-2,33.23,33.23,0,0,1,0-5,32.6,32.6,0,0,1,.78-4.89,6.82,6.82,0,0,1,.65-2c.15,0-.6,3.07-.91,6.89S405.58,302.87,405.42,302.89Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M471.62,313.28a66.35,66.35,0,0,1-2.39-11.51,66.35,66.35,0,0,1,2.39,11.51Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M477.47,312.68a46.21,46.21,0,0,1,0-9.79,46.21,46.21,0,0,1,0,9.79Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M481.22,314.91a75.65,75.65,0,0,1,3.62-12.06,39.27,39.27,0,0,1-1.56,6.1A38.27,38.27,0,0,1,481.22,314.91Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M451,466c-.15,0-.76-2.33-2-5s-2.69-4.68-2.57-4.78A18.51,18.51,0,0,1,451,466Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M455.61,465.4a27,27,0,0,1-1.4-5.13,27.49,27.49,0,0,1-.89-5.24,27.88,27.88,0,0,1,1.4,5.13A27.49,27.49,0,0,1,455.61,465.4Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
        <path
          d="M460.11,465.4a36.24,36.24,0,0,1,.61-6.08,35,35,0,0,1,1.13-6,73.92,73.92,0,0,1-1.74,12.1Z"
          style={{ fill: "#e0e0e0" }}
        ></path>
      </g>
      <g id="freepik--Floor--inject-252">
        <path
          d="M72.82,246.39c0,.15-10.29.26-23,.26s-23-.11-23-.26,10.29-.26,23-.26S72.82,246.25,72.82,246.39Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M70.13,239.94a13.77,13.77,0,0,1,3.23,6.72,25.13,25.13,0,0,1-1.62-3.36A26.61,26.61,0,0,1,70.13,239.94Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M74.51,237.8c.15,0-.09,2.11.4,4.61s1.47,4.37,1.32,4.45a9.14,9.14,0,0,1-1.83-4.35A8.88,8.88,0,0,1,74.51,237.8Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M79.52,235.1c.15,0-.46,2.45-.58,5.49s.24,5.5.09,5.53a18.2,18.2,0,0,1,.49-11Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M114.5,246.12c0,.15-6.81.27-15.2.27s-15.19-.12-15.19-.27,6.8-.26,15.19-.26S114.5,246,114.5,246.12Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M443.05,246.39c0,.14-7.89.26-17.61.26s-17.62-.12-17.62-.26,7.89-.26,17.62-.26S443.05,246.24,443.05,246.39Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M445.21,240.47c.16,0,.35,2.1,1.17,4.54s1.88,4.27,1.75,4.36a13.6,13.6,0,0,1-2.92-8.9Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M449.5,239.67c.15,0,.12,2.07.42,4.58s.8,4.51.66,4.56a16.77,16.77,0,0,1-1.08-9.14Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M454.26,240.72a19.63,19.63,0,0,1-1.38,6.18,19.79,19.79,0,0,1,1.38-6.18Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M480.08,245.48c0,.14-5.19.26-11.59.26s-11.59-.12-11.59-.26,5.19-.26,11.59-.26S480.08,245.33,480.08,245.48Z"
          style={{ fill: "#263238" }}
        ></path>
      </g>
      <g id="freepik--Plant--inject-252">
        <path
          d="M454.36,348.76c-1.16,1.65-3.4,1.11-4.44.1A8.37,8.37,0,0,1,448,345c-.92-3.18-1.84-6.51-1.16-9.75a5.39,5.39,0,0,1,1.25-2.65,2.82,2.82,0,0,1,2.68-.89,4.16,4.16,0,0,1,2.34,2.46,23.16,23.16,0,0,1,2.3,10,8.05,8.05,0,0,1-1.09,4.61"
          style={{ fill: "#0E794E" }}
        ></path>
        <g style={{ opacity: "0.2" }}>
          <path d="M454.36,348.76c-1.16,1.65-3.4,1.11-4.44.1A8.37,8.37,0,0,1,448,345c-.92-3.18-1.84-6.51-1.16-9.75a5.39,5.39,0,0,1,1.25-2.65,2.82,2.82,0,0,1,2.68-.89,4.16,4.16,0,0,1,2.34,2.46,23.16,23.16,0,0,1,2.3,10,8.05,8.05,0,0,1-1.09,4.61"></path>
        </g>
        <path
          d="M450,357.12a10,10,0,0,0-6.21-.76,5.2,5.2,0,0,0-3.06,1.37,2.2,2.2,0,0,0,0,3.06,2.91,2.91,0,0,0,1.94.49c1.64,0,3.46-.3,4.77.68.75.57,1.25,1.5,2.14,1.78a2.11,2.11,0,0,0,2.33-1,3.62,3.62,0,0,0,.26-2.67A4.08,4.08,0,0,0,450,357.12Z"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M457.53,351.13a6,6,0,0,1-.93-5.52,10.53,10.53,0,0,1,3.27-4.75,17.57,17.57,0,0,1,5.85-3.45,6.18,6.18,0,0,1,2.64-.45,2.78,2.78,0,0,1,2.21,1.34c.62,1.17,0,2.6-.61,3.76a45.52,45.52,0,0,1-3.85,5.86,10.49,10.49,0,0,1-4.23,3.63c-1.76.67-3.59.59-4.52-.63"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M454.44,373.64a3.36,3.36,0,0,1-.11-.74c-.05-.55-.12-1.24-.2-2a27.72,27.72,0,0,0-.46-3,22.15,22.15,0,0,0-1.09-3.54,13.15,13.15,0,0,0-1.8-3.21,7,7,0,0,0-2.29-1.9,6.34,6.34,0,0,0-1.93-.59,3.7,3.7,0,0,1-.74-.11,3.19,3.19,0,0,1,.76,0,5.66,5.66,0,0,1,2,.52,6.84,6.84,0,0,1,2.42,1.91,12.94,12.94,0,0,1,1.87,3.27,22,22,0,0,1,1.08,3.6,25.29,25.29,0,0,1,.4,3c.07.87.09,1.57.1,2.06A4,4,0,0,1,454.44,373.64Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M454.3,372.07a1.35,1.35,0,0,1,0-.35v-1c0-.86,0-2.11,0-3.66-.07-3.08-.34-7.34-.85-12s-1.2-8.89-1.83-11.91c-.14-.76-.29-1.44-.43-2s-.25-1.11-.36-1.53-.17-.71-.23-1a1.48,1.48,0,0,1-.06-.35,1.68,1.68,0,0,1,.12.33c.07.25.17.56.29,1s.26.93.41,1.52.32,1.28.48,2A113.89,113.89,0,0,1,453.69,355c.51,4.69.74,9,.76,12.05,0,1.55,0,2.8-.05,3.66,0,.41,0,.73-.06,1A1.91,1.91,0,0,1,454.3,372.07Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M454.28,363.83a5.45,5.45,0,0,1,0-1c0-.67.13-1.64.32-2.82a36.7,36.7,0,0,1,.92-4.1,35,35,0,0,1,1.71-4.85,25.76,25.76,0,0,1,5-7.84,11.52,11.52,0,0,1,1.18-1.1,6.14,6.14,0,0,1,.51-.43l.46-.32a6.2,6.2,0,0,1,.87-.56,32.29,32.29,0,0,0-2.87,2.56,27.33,27.33,0,0,0-4.9,7.81,37.61,37.61,0,0,0-1.73,4.81,40,40,0,0,0-1,4.06c-.22,1.17-.34,2.12-.42,2.79A7,7,0,0,1,454.28,363.83Z"
          style={{ fill: "#263238" }}
        ></path>
      </g>
      <g id="freepik--Grass--inject-252">
        <path
          d="M68.11,334.67a5.9,5.9,0,0,1,1.68,1.41,14.59,14.59,0,0,1,2.81,4.49,14.3,14.3,0,0,1,1,5.21,5.93,5.93,0,0,1-.26,2.17,21.69,21.69,0,0,0-1.22-7.18A21.29,21.29,0,0,0,68.11,334.67Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M77.21,337a18.72,18.72,0,0,0-1.07,4.61,18.08,18.08,0,0,0,.65,4.67c-.05,0-.37-.42-.67-1.26a9.1,9.1,0,0,1-.5-3.44,9.2,9.2,0,0,1,.81-3.37C76.8,337.39,77.16,337,77.21,337Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M81.86,334.47a45.81,45.81,0,0,0-.73,6.12,45.77,45.77,0,0,0,.64,6.13,5.1,5.1,0,0,1-.64-1.72,17.52,17.52,0,0,1-.52-4.41,17.1,17.1,0,0,1,.59-4.41A5,5,0,0,1,81.86,334.47Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M181,312.09a85.26,85.26,0,0,1,5.52,12.22A85.26,85.26,0,0,1,181,312.09Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M187.34,311.68c.16,0,.11,2.29.78,5s1.76,4.7,1.62,4.78a11.17,11.17,0,0,1-2.12-4.66A10.86,10.86,0,0,1,187.34,311.68Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M192.55,310.84a22.57,22.57,0,0,1,.31,4.85,23.26,23.26,0,0,1-.22,4.85,22.22,22.22,0,0,1-.3-4.85A23,23,0,0,1,192.55,310.84Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M434,306.19c.16,0-.06,2.32.34,5.11s1.23,4.95,1.08,5a11.86,11.86,0,0,1-1.59-4.94A12,12,0,0,1,434,306.19Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M382.82,350.84a29.82,29.82,0,0,1,3.34,7.18,15.66,15.66,0,0,1-1.91-3.48A15.43,15.43,0,0,1,382.82,350.84Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M387.66,348.38c.15,0-.15,2.57,0,5.7s.64,5.66.49,5.69a16.43,16.43,0,0,1-1-5.66A16.14,16.14,0,0,1,387.66,348.38Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M467.62,404.92a21.42,21.42,0,0,1,.29,4.64,21.68,21.68,0,0,1-.23,4.64,41.54,41.54,0,0,1-.06-9.28Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M103.8,427.26a10.39,10.39,0,0,1,4,4.39,10.52,10.52,0,0,1,1.46,5.75,25.83,25.83,0,0,0-1.92-5.5A25.24,25.24,0,0,0,103.8,427.26Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M108.43,425.59c.15,0,.51,2.22,1.33,4.89s1.76,4.74,1.62,4.81a19.72,19.72,0,0,1-2.95-9.7Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M116,426.85c.15,0-.18,1.81-.17,4s.32,4,.17,4a12,12,0,0,1,0-8Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M137.85,277.34a12,12,0,0,1,2.82,4.32,12.14,12.14,0,0,1,1.25,5c-.15,0-.6-2.23-1.73-4.8S137.73,277.43,137.85,277.34Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M142,277.72a21.23,21.23,0,0,1,1.73,6.47,11.43,11.43,0,0,1-1.12-3.17A10.79,10.79,0,0,1,142,277.72Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M147.82,278.49c.15.05-.34,1.74-.48,3.87s.07,3.87-.09,3.9a10.94,10.94,0,0,1,.57-7.77Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M428.22,308.3a17.39,17.39,0,0,1,3.25,11.82,55.53,55.53,0,0,0-1.05-6.07A55.2,55.2,0,0,0,428.22,308.3Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M440.86,308.73c.13.09-.8,1.4-1.25,3.27s-.27,3.46-.43,3.48a5.49,5.49,0,0,1-.07-3.6A5.42,5.42,0,0,1,440.86,308.73Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M460.79,404a33.5,33.5,0,0,1,2,5.4,31.44,31.44,0,0,1,1.47,5.55,31,31,0,0,1-2-5.4A31.44,31.44,0,0,1,460.79,404Z"
          style={{ fill: "#263238" }}
        ></path>
      </g>
      <g id="freepik--soccer-ball--inject-252">
        <circle
          cx="50.2"
          cy="231.89"
          r="14.05"
          transform="translate(-186.75 243.96) rotate(-80.7)"
          style={{ fill: "#0E794E" }}
        ></circle>
        <g style={{ opacity: "0.5" }}>
          <path d="M41.62,240.12a8.91,8.91,0,0,0-2.41.18,10.25,10.25,0,0,0,2.41.12,10.28,10.28,0,0,0,2.42-.18A9.26,9.26,0,0,0,41.62,240.12Z"></path>
          <path d="M61.64,234.25c-.38-.51-1.12-1.43-2-2.46a28,28,0,0,0-2.47-2.69l.69-4.39a15.53,15.53,0,0,0,1.72-.46,7.35,7.35,0,0,0,1.91-.75,7,7,0,0,0-2,.47c-.67.21-1.26.42-1.6.57v0L53,222l0,0a10.21,10.21,0,0,0-.87-1.23,9.54,9.54,0,0,0-1.64-1.62l1.36-1.29a9.68,9.68,0,0,0-3.31,0c-2.33.27-2.27,1.25-2.27,1.25l4.07.09c.27.31.9.95,1.56,1.76.36.44.68.87.93,1.21l-3.59,3.59c-.5,0-1.42.08-2.49.22a13.19,13.19,0,0,0-2.82.51,14.72,14.72,0,0,0,2.86-.21c1.07-.14,2-.28,2.46-.37l2.34,4.58-.33.49c-.39.63-.9,1.51-1.41,2.51s-.86,1.82-1.13,2.5L45,235.67c-.18-.43-.39-.91-.62-1.42-.51-1.14-1-2.1-1.25-2.58l.81-5.11-3.41-2.71c.35-.2,1.54-1.09,2.93-2.2a23.69,23.69,0,0,0,2.86-2.47,24.68,24.68,0,0,0-3.05,2.24c-1.4,1.12-2.54,2.09-2.8,2.38l-.17-.13-3.4,3.45,1.72,5c-.17.35-.49,1.24-.88,2.29a14.36,14.36,0,0,0-.83,2.5,9.86,9.86,0,0,0,1.11-2.4,13.77,13.77,0,0,0,.7-2.37l4.32-.32c.19.54.59,1.48,1.06,2.54.24.51.46,1,.66,1.4L44,240.24l4.17,3.31h0a9,9,0,0,0,.91,1.29c.59.73,1.12,1.28,1.19,1.23a5.05,5.05,0,0,0-1-1.42,9.2,9.2,0,0,0-1.06-1.16L51.52,241l-2.13-4.88-.43,0c.3-.64.7-1.47,1.16-2.38.63-1.26,1.23-2.34,1.56-3l5.36-.85.11-.7A33.73,33.73,0,0,0,59.4,232c.85,1,1.61,1.84,2.07,2.31l-.07,0-3.11,5,0,0c-.64.11-1.82.36-3.17.68-1,.24-1.92.47-2.58.65a6.07,6.07,0,0,0-1,.32,18,18,0,0,0,3.7-.68c1.39-.33,2.58-.64,3.19-.84L60,241.92a10.9,10.9,0,0,0,4-8.16v0Z"></path>
        </g>
      </g>
      <g id="freepik--Goal--inject-252">
        <path
          d="M404.32,258.9h-7V86.56a4.79,4.79,0,0,0-4.79-4.79H131.22a4.8,4.8,0,0,0-4.79,4.79V258.9h-7V86.56a11.78,11.78,0,0,1,11.77-11.77H392.54a11.79,11.79,0,0,1,11.78,11.77Z"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M163.22,230.91c0,.08-8.84,2.62-19.79,5.66s-19.84,5.45-19.87,5.37,8.84-2.61,19.79-5.66S163.19,230.83,163.22,230.91Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,218.08c0,.08-8.84,2.61-19.79,5.66s-19.84,5.45-19.87,5.37,8.84-2.62,19.79-5.66S163.19,218,163.22,218.08Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,205.24c0,.08-8.84,2.62-19.79,5.67s-19.84,5.45-19.87,5.37,8.84-2.62,19.79-5.67S163.19,205.16,163.22,205.24Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,192.41c0,.08-8.84,2.62-19.79,5.66s-19.84,5.45-19.87,5.37,8.84-2.61,19.79-5.66S163.19,192.33,163.22,192.41Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,179.58c0,.08-8.84,2.61-19.79,5.66s-19.84,5.45-19.87,5.37S132.4,188,143.35,185,163.19,179.49,163.22,179.58Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,166.74c0,.08-8.84,2.62-19.79,5.66s-19.84,5.46-19.87,5.38,8.84-2.62,19.79-5.67S163.19,166.66,163.22,166.74Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,153.91c0,.08-8.84,2.61-19.79,5.66s-19.84,5.45-19.87,5.37,8.84-2.61,19.79-5.66S163.19,153.83,163.22,153.91Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,141.07c0,.08-8.84,2.62-19.79,5.67s-19.84,5.45-19.87,5.37,8.84-2.62,19.79-5.67S163.19,141,163.22,141.07Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,128.24c0,.08-8.84,2.62-19.79,5.66s-19.84,5.45-19.87,5.37,8.84-2.61,19.79-5.66S163.19,128.16,163.22,128.24Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M163.22,115.41c0,.08-8.84,2.61-19.79,5.66s-19.84,5.45-19.87,5.37,8.84-2.62,19.79-5.66S163.19,115.33,163.22,115.41Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M154.09,105.11c0,.08-6.79,2-15.22,4.39s-15.28,4.19-15.31,4.11,6.8-2,15.23-4.4S154.07,105,154.09,105.11Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M143.39,97.08a4,4,0,0,1-.76.22l-2.11.48c-1.79.4-4.26.92-7,1.46-5.47,1.08-10,1.83-10,1.53a18.24,18.24,0,0,0,2.9-.46l7-1.37,7-1.37,2.13-.39A4.48,4.48,0,0,1,143.39,97.08Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M133.48,254.26c-.09,0-.15-36.24-.15-80.93s.06-80.94.15-80.94.15,36.23.15,80.94S133.56,254.26,133.48,254.26Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M143.39,250.8c-.08,0-.15-34.41-.15-76.86s.07-76.86.15-76.86.15,34.41.15,76.86S143.47,250.8,143.39,250.8Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M153.86,247.26s0-.13,0-.37,0-.61,0-1.08c0-1,0-2.36,0-4.16,0-3.63,0-8.85-.07-15.31-.08-12.93-.18-30.78-.3-50.49s-.2-37.58-.2-50.5c0-6.45,0-11.68,0-15.3,0-1.8,0-3.2,0-4.17,0-.46,0-.82,0-1.08s0-.37,0-.37,0,.13,0,.37,0,.62,0,1.08c0,1,0,2.37,0,4.17,0,3.62,0,8.85.07,15.3.08,12.93.18,30.78.29,50.5s.21,37.57.21,50.49c0,6.46,0,11.68,0,15.31,0,1.8,0,3.2,0,4.16,0,.47,0,.83,0,1.08S153.86,247.26,153.86,247.26Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,229.85c0-.09,8.92,2.32,19.87,5.37s19.81,5.58,19.78,5.66-8.91-2.32-19.87-5.37S358.73,229.93,358.75,229.85Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,217c0-.08,8.92,2.33,19.87,5.37s19.81,5.58,19.78,5.67-8.91-2.33-19.87-5.38S358.73,217.09,358.75,217Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,204.18c0-.08,8.92,2.32,19.87,5.37s19.81,5.58,19.78,5.66-8.91-2.32-19.87-5.37S358.73,204.26,358.75,204.18Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,191.34c0-.08,8.92,2.33,19.87,5.37s19.81,5.59,19.78,5.67-8.91-2.33-19.87-5.37S358.73,191.42,358.75,191.34Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,178.51c0-.08,8.92,2.32,19.87,5.37s19.81,5.58,19.78,5.66-8.91-2.32-19.87-5.37S358.73,178.59,358.75,178.51Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,165.68c0-.08,8.92,2.32,19.87,5.37s19.81,5.58,19.78,5.66-8.91-2.32-19.87-5.37S358.73,165.76,358.75,165.68Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,152.84c0-.08,8.92,2.33,19.87,5.37s19.81,5.59,19.78,5.67-8.91-2.33-19.87-5.37S358.73,152.92,358.75,152.84Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,140c0-.08,8.92,2.32,19.87,5.37S398.43,151,398.4,151s-8.91-2.32-19.87-5.37S358.73,140.09,358.75,140Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,127.18c0-.09,8.92,2.32,19.87,5.37s19.81,5.58,19.78,5.66-8.91-2.32-19.87-5.37S358.73,127.26,358.75,127.18Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M358.75,114.34c0-.08,8.92,2.33,19.87,5.37s19.81,5.58,19.78,5.66-8.91-2.32-19.87-5.37S358.73,114.42,358.75,114.34Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M367.87,104.05c0-.08,6.88,1.75,15.31,4.1s15.25,4.31,15.22,4.39-6.87-1.75-15.3-4.1S367.85,104.13,367.87,104.05Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M378.58,96a4.19,4.19,0,0,1,.79.11l2.12.39,7,1.37,7,1.37a20,20,0,0,0,2.9.46c0,.29-4.5-.46-10-1.54-2.73-.54-5.2-1.06-7-1.45l-2.11-.49A3.48,3.48,0,0,1,378.58,96Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M388.49,253.2c-.08,0-.15-36.24-.15-80.94s.07-80.94.15-80.94.15,36.23.15,80.94S388.57,253.2,388.49,253.2Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M378.58,249.74c-.09,0-.15-34.42-.15-76.86s.06-76.87.15-76.87.15,34.41.15,76.87S378.66,249.74,378.58,249.74Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M368.1,246.19s0-.12,0-.36,0-.62,0-1.09c0-1,0-2.36,0-4.16,0-3.62,0-8.85,0-15.3,0-12.93.08-30.78.2-50.5s.22-37.56.3-50.5c0-6.45.05-11.68.07-15.3,0-1.8,0-3.2,0-4.16l0-1.08c0-.25,0-.37,0-.37s0,.12,0,.37,0,.61,0,1.08c0,1,0,2.36,0,4.16,0,3.62,0,8.85,0,15.3,0,12.93-.08,30.78-.2,50.51s-.22,37.56-.3,50.49c0,6.45-.06,11.68-.07,15.3,0,1.8,0,3.2,0,4.16,0,.47,0,.83,0,1.09S368.1,246.19,368.1,246.19Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M387.49,90.75c0,.08-56.91.15-127.09.15s-127.11-.07-127.11-.15,56.9-.15,127.11-.15S387.49,90.67,387.49,90.75Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M377.14,97.08c0,.08-52,.15-116.1.15s-116.11-.07-116.11-.15,52-.15,116.11-.15S377.14,97,377.14,97.08Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M364.87,105.11c0,.08-47.31.15-105.65.15s-105.66-.07-105.66-.15,47.3-.15,105.66-.15S364.87,105,364.87,105.11Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M152,80.9l.43.43,1.23,1.29,4.66,4.95c4,4.3,9.83,10.48,16.9,18l0,0v.05c0,14.27,0,32.38,0,52,0,23.73,0,45.22-.05,60.77,0,7.77,0,14.06,0,18.42,0,2.17,0,3.85,0,5,0,.56,0,1,0,1.3s0,.44,0,.44,0-.15,0-.44,0-.74,0-1.3c0-1.16,0-2.84,0-5,0-4.36,0-10.65,0-18.42,0-15.55,0-37-.05-60.77,0-19.65,0-37.76,0-52l0,.08-16.83-18.1c-2-2.16-3.55-3.84-4.62-5l-1.2-1.32C152.12,81.06,152,80.9,152,80.9Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M178.05,80.9s.08.14.21.42l.61,1.23,2.3,4.78,8.4,17.58v0c0,14.52,0,34.13,0,55.67,0,22.73,0,43.3-.05,58.2,0,7.44,0,13.47,0,17.64,0,2.08,0,3.69,0,4.8,0,.54,0,1,0,1.24s0,.43,0,.43a3.62,3.62,0,0,1,0-.43l0-1.24c0-1.11,0-2.72,0-4.8,0-4.17,0-10.2,0-17.64,0-14.9,0-35.47-.05-58.2,0-21.54,0-41.15,0-55.67v0c-3.5-7.43-6.34-13.44-8.3-17.62l-2.25-4.8c-.25-.54-.44-1-.58-1.25Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M198.06,80.39s.05.14.12.42.17.7.31,1.23c.27,1.09.66,2.69,1.17,4.73,1,4.13,2.46,10.08,4.25,17.43h0v0c0,14.6,0,34.63.05,56.72,0,22.44,0,42.75-.05,57.46,0,7.34,0,13.29,0,17.41,0,2.05,0,3.64,0,4.73,0,.53,0,.94,0,1.23s0,.42,0,.42,0-.14,0-.42l0-1.23c0-1.09,0-2.68,0-4.73,0-4.12,0-10.07-.05-17.41,0-14.71,0-35,0-57.46,0-22.09,0-42.12,0-56.72v0c-1.75-7.36-3.17-13.32-4.16-17.45-.48-2-.85-3.65-1.11-4.75-.12-.53-.22-.94-.28-1.23Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M215.18,80.39s0,.15.07.45.09.74.17,1.31c.14,1.15.35,2.85.62,5,.52,4.38,1.28,10.7,2.21,18.5h0c0,14.56,0,34.41,0,56.25,0,22.57,0,43,0,57.79,0,7.39,0,13.37-.05,17.51,0,2.06,0,3.67,0,4.76,0,.54,0,.95,0,1.24s0,.42,0,.42,0-.14,0-.42,0-.7,0-1.24c0-1.09,0-2.7,0-4.76,0-4.14,0-10.12,0-17.51,0-14.79,0-35.22,0-57.79,0-21.84,0-41.69,0-56.25h0l-2.11-18.5c-.25-2.18-.44-3.88-.57-5,0-.57-.1-1-.13-1.31S215.18,80.39,215.18,80.39Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M231.3,81.79s0,.14,0,.41,0,.7.07,1.23c.06,1.09.15,2.67.26,4.71.22,4.11.52,10,.9,17.34,0,14.67,0,34.92.06,57.28s0,42.62,0,57.28c0,7.33,0,13.25-.05,17.36,0,2,0,3.63,0,4.72,0,.54,0,.94,0,1.23s0,.42,0,.42,0-.14,0-.42l0-1.23c0-1.09,0-2.67,0-4.72,0-4.1,0-10,0-17.36,0-14.66,0-34.91,0-57.28s0-42.61,0-57.27c-.34-7.32-.61-13.24-.8-17.34-.09-2-.16-3.63-.21-4.72,0-.53,0-.94,0-1.22S231.3,81.79,231.3,81.79Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M246.82,81.79c.08,0,.15,36.69.15,82s-.07,82-.15,82-.15-36.69-.15-82S246.74,81.79,246.82,81.79Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M261.16,81.79c.08,0,.15,36.69.15,82s-.07,82-.15,82-.15-36.69-.15-82S261.08,81.79,261.16,81.79Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M276.36,81.79c.09,0,0,36.69-.28,82s-.5,82-.58,82,0-36.69.28-82S276.28,81.79,276.36,81.79Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M294.63,81.79s0,.14,0,.42-.1.7-.17,1.24c-.16,1.1-.38,2.7-.67,4.76-.6,4.14-1.46,10.11-2.53,17.49v0c0,14.75,0,35.07,0,57.5s0,43,0,57.74c0,7.38,0,13.36-.05,17.5,0,2.06,0,3.66,0,4.76,0,.53,0,.94,0,1.23s0,.42,0,.42,0-.14,0-.42,0-.7,0-1.23c0-1.1,0-2.7,0-4.76,0-4.14,0-10.12,0-17.5,0-14.78,0-35.19-.05-57.74s0-42.75.05-57.5h0c1.1-7.37,2-13.33,2.62-17.47.32-2.06.56-3.65.73-4.75l.2-1.23C294.6,81.93,294.63,81.79,294.63,81.79Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M314.15,81.79l-.16.45-.51,1.3c-.45,1.16-1.11,2.84-2,5-1.72,4.34-4.19,10.61-7.25,18.35v0c0,14.5,0,34,0,55.49,0,22.78,0,43.39-.05,58.33,0,7.45,0,13.49,0,17.67,0,2.08,0,3.7,0,4.81,0,.54,0,1,0,1.25s0,.42,0,.42,0-.14,0-.42v-1.25c0-1.11,0-2.73,0-4.81,0-4.18,0-10.22-.05-17.67,0-14.94,0-35.55,0-58.33,0-21.45,0-41,0-55.49v0c3.1-7.72,5.6-14,7.34-18.32.87-2.16,1.55-3.83,2-5,.24-.56.41-1,.54-1.3S314.15,81.79,314.15,81.79Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M329.58,81.79l-.18.41-.56,1.21L326.67,88c-1.91,4-4.66,9.81-8.05,17v0c0,14.55,0,34.36,0,56.15,0,22.6,0,43.05-.05,57.86,0,7.4,0,13.39,0,17.54,0,2.06,0,3.67,0,4.77,0,.53,0,.95,0,1.23s0,.43,0,.43,0-.15,0-.43,0-.7,0-1.23c0-1.1,0-2.71,0-4.77,0-4.15,0-10.14,0-17.54,0-14.81,0-35.26-.05-57.86,0-21.79,0-41.6.05-56.15v0L326.56,88l2.22-4.6.59-1.19C329.5,81.92,329.58,81.79,329.58,81.79Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M347.19,81.79s-.07.15-.23.43-.42.7-.73,1.25l-2.84,4.77L333,105.74l0-.06c0,14.47,0,33.83,0,55,0,22.9,0,43.63-.05,58.64,0,7.5,0,13.56,0,17.77,0,2.09,0,3.72,0,4.83l0,1.26c0,.28,0,.42,0,.42s0-.14,0-.42,0-.72,0-1.26c0-1.11,0-2.74,0-4.83,0-4.21,0-10.27-.05-17.77,0-15,0-35.74-.05-58.64,0-21.22,0-40.58,0-55v0l0,0c4.43-7.35,8-13.31,10.53-17.44,1.24-2.06,2.21-3.65,2.88-4.75l.76-1.23Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M369.49,81.79s-.12.15-.38.42L368,83.44c-1,1.07-2.53,2.64-4.44,4.66L347.28,105l0-.09c0,14.32,0,32.8,0,52.91,0,23.49,0,44.75-.05,60.15,0,7.69,0,13.92-.05,18.23,0,2.15,0,3.82,0,5,0,.56,0,1,0,1.29s0,.44,0,.44,0-.15,0-.44,0-.73,0-1.29c0-1.14,0-2.81,0-5,0-4.31,0-10.54-.05-18.23,0-15.4,0-36.66,0-60.15,0-20.11,0-38.59,0-52.91v0l0,0L363.42,88l4.49-4.61,1.17-1.2Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,116.71c0,.08-43.81.15-97.84.15s-97.86-.07-97.86-.15,43.8-.15,97.86-.15S357.59,116.62,357.59,116.71Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,129.19c0,.08-43.81.15-97.84.15s-97.86-.07-97.86-.15,43.8-.15,97.86-.15S357.59,129.1,357.59,129.19Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,141.67c0,.08-43.81.15-97.84.15s-97.86-.07-97.86-.15,43.8-.15,97.86-.15S357.59,141.58,357.59,141.67Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,154.15c0,.08-43.81.15-97.84.15s-97.86-.07-97.86-.15,43.8-.16,97.86-.16S357.59,154.06,357.59,154.15Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,166.63c0,.08-43.81.15-97.84.15s-97.86-.07-97.86-.15,43.8-.16,97.86-.16S357.59,166.54,357.59,166.63Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,179.11c0,.08-43.81.15-97.84.15s-97.86-.07-97.86-.15,43.8-.16,97.86-.16S357.59,179,357.59,179.11Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,191.59c0,.08-43.81.15-97.84.15s-97.86-.07-97.86-.15,43.8-.16,97.86-.16S357.59,191.5,357.59,191.59Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,204.06c0,.09-43.81.16-97.84.16s-97.86-.07-97.86-.16,43.8-.15,97.86-.15S357.59,204,357.59,204.06Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,216.54c0,.09-43.81.16-97.84.16s-97.86-.07-97.86-.16,43.8-.15,97.86-.15S357.59,216.46,357.59,216.54Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,229c0,.09-43.81.16-97.84.16s-97.86-.07-97.86-.16,43.8-.15,97.86-.15S357.59,228.94,357.59,229Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M357.59,241.5c0,.09-43.81.15-97.84.15s-97.86-.06-97.86-.15,43.8-.15,97.86-.15S357.59,241.42,357.59,241.5Z"
          style={{ fill: "#263238" }}
        ></path>
        <polygon
          points="125.25 258.92 124.83 254.93 163.5 242.27 163.92 246.25 125.25 258.92"
          style={{ fill: "#0E794E" }}
        ></polygon>
        <polygon
          points="399.73 258.36 355.23 247.14 356.75 243.09 401.25 254.31 399.73 258.36"
          style={{ fill: "#0E794E" }}
        ></polygon>
        <path
          d="M358.07,246.53H161.61V125.79A25.92,25.92,0,0,0,150,104.16L125,87.52l1.93-2.91,25,16.64a29.42,29.42,0,0,1,13.15,24.54V243H354.58V125.79a29.41,29.41,0,0,1,13.16-24.54l30.58-20.9,2,2.88-30.6,20.91a26,26,0,0,0-11.62,21.65Z"
          style={{ fill: "#0E794E" }}
        ></path>
      </g>
      <g id="freepik--Character--inject-252">
        <path
          d="M178.27,438.61c3.6,9.59,15.65,12.78,25.89,12.47s20.93-2.67,30.41,1.21c7.16,2.93,12.56,9,19.46,12.53,15.8,8,34.56.52,52.22-.65,13.58-.9,27.21,2,40.78,1s28.21-7.69,32.53-20.6c4.47,2.55,9.05,5.14,14.11,6s10.8-.22,14.18-4.1,3.69-9.82,1.83-14.65-5.55-8.72-9.48-12.09c-20.59-17.59-48.76-23.17-75.75-25.51s-54.63-2.19-80.3-10.82"
          style={{ fill: "#ebebeb" }}
        ></path>
        <path
          d="M316.44,206.45l-4.87,56.47-28.29-2.26c-.17-3.3.06-16.08.06-16.08s-11.76-1.83-11.91-13.59c-.07-5.72.75-17.53,1.61-28.16a21.76,21.76,0,0,1,23-20h0A21.78,21.78,0,0,1,316.44,206.45Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M283.32,244.41a27.3,27.3,0,0,0,15.34-4.36s-3.62,8.47-15.36,7.41Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M275.82,210.64a1.67,1.67,0,0,0,1.62,1.7,1.61,1.61,0,0,0,1.73-1.52,1.69,1.69,0,0,0-1.62-1.69A1.6,1.6,0,0,0,275.82,210.64Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M275.55,208.76c.21.21,1.48-.73,3.29-.72s3.13.91,3.33.68-.12-.49-.69-.91a4.57,4.57,0,0,0-2.67-.82,4.5,4.5,0,0,0-2.62.84C275.64,208.26,275.45,208.66,275.55,208.76Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M293.3,211.31a1.68,1.68,0,0,0,1.62,1.7,1.61,1.61,0,0,0,1.73-1.52,1.68,1.68,0,0,0-1.62-1.7A1.61,1.61,0,0,0,293.3,211.31Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M293.32,209.09c.21.22,1.49-.72,3.29-.72s3.14.91,3.33.69-.11-.49-.69-.91a4.57,4.57,0,0,0-2.67-.82,4.39,4.39,0,0,0-2.61.84C293.41,208.6,293.22,209,293.32,209.09Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M286.76,222.5a11.84,11.84,0,0,0-2.93-.53c-.47-.05-.9-.14-1-.45a2.3,2.3,0,0,1,.31-1.37c.43-1.12.89-2.29,1.36-3.52,1.9-5,3.27-9.12,3.07-9.19s-1.9,3.92-3.8,8.92c-.46,1.24-.89,2.42-1.31,3.54a2.73,2.73,0,0,0-.24,1.81,1.18,1.18,0,0,0,.76.68,3.55,3.55,0,0,0,.79.11A11.62,11.62,0,0,0,286.76,222.5Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M301.43,205c-.16-.5-2-.32-4.08-.64s-3.81-1-4.11-.52c-.13.21.15.68.83,1.18a6.94,6.94,0,0,0,3,1.16,6.84,6.84,0,0,0,3.22-.28C301.1,205.61,301.5,205.24,301.43,205Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M281.21,203.13c-.44-.28-1.46.55-2.86,1.08s-2.69.7-2.82,1.2c0,.24.28.56.93.73A4.42,4.42,0,0,0,281,204.3C281.39,203.72,281.41,203.27,281.21,203.13Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M312.47,211.77c.2-.09,8.08-2.39,7.83,5.65s-8.28,6.13-8.29,5.9S312.47,211.77,312.47,211.77Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M314.57,220.35s.13.1.37.22a1.37,1.37,0,0,0,1,.05c.86-.28,1.62-1.61,1.71-3.06a4.65,4.65,0,0,0-.33-2,1.63,1.63,0,0,0-1-1.11.7.7,0,0,0-.84.35c-.12.23-.07.39-.11.4s-.17-.14-.1-.47a.85.85,0,0,1,.34-.49,1,1,0,0,1,.78-.18,2,2,0,0,1,1.42,1.29,4.76,4.76,0,0,1,.42,2.26c-.11,1.62-1,3.11-2.16,3.41a1.47,1.47,0,0,1-1.27-.26C314.57,220.55,314.54,220.36,314.57,220.35Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M316.58,211.38a4.08,4.08,0,0,0-3.31,2.59c-.29,1.19-.16,2.45-.45,3.64s-1.21,2.39-2.43,2.34a2.38,2.38,0,0,1-1.93-1.44,6.44,6.44,0,0,1-.5-2.46c-.24-3.66-.17-7.34-.71-11a18.71,18.71,0,0,0-4.26-10c-2.47-2.7-6.38-4.28-9.91-3.3-2.33.64-4.28,2.3-6.57,3.09a9.51,9.51,0,0,1-8.26-1.1,2.38,2.38,0,0,0-.41-.22,2.11,2.11,0,0,1-.89-3.06c3.85-5.23,12.06-8.07,18.54-7.7s13.12,3.62,16.9,8.91,4.53,13.49,4.19,19.64"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M284.25,227l4.49-.68a2.25,2.25,0,0,1,1.34.08,1.4,1.4,0,0,1,.72,1.08,2.76,2.76,0,0,1-.2,1.33,3.61,3.61,0,0,1-1.12,1.64,3.71,3.71,0,0,1-1.89.42,9.85,9.85,0,0,1-1.83-.12"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M285.76,230.75a1.53,1.53,0,0,1,.58,0,7.55,7.55,0,0,0,1.51-.06,7.17,7.17,0,0,0,1-.15,1.65,1.65,0,0,0,.86-.63,3.85,3.85,0,0,0,.62-1.11,2.61,2.61,0,0,0,.19-1.29,1.15,1.15,0,0,0-.67-.9,2.79,2.79,0,0,0-1.22,0l-2.28.29a8.48,8.48,0,0,1-2.12.13,9.18,9.18,0,0,1,2.06-.5l2.26-.39a3,3,0,0,1,1.46,0,1.62,1.62,0,0,1,1,1.3,2.92,2.92,0,0,1-.23,1.55,3.92,3.92,0,0,1-.72,1.24,2.16,2.16,0,0,1-1.12.74,5.6,5.6,0,0,1-1.1.09,4.83,4.83,0,0,1-1.57-.1C286,230.85,285.76,230.79,285.76,230.75Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M259.94,199.54l7.69-14.88,14.65-2.21c2,.35,1.36,3.72-.4,4L271.43,188l-6.82,13.4Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M266.8,208.58l-40,19.3,48.11,25.82s-14.2,31.42-15,32.08c0,0-38.44-27-53.9-38.23-4.62-3.35-10.51-9-11.39-16.66h0c-.14-13.35,6.51-18.44,12.93-19.49l51.5-11.86,8.13-14.88"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M266.68,208.67s5.93-1,5.93-5.6c0-.29.26-10.84.26-10.84l7.38-3.91s2.77-2.23,1.09-2.69-12.6,2-12.6,2l-5.41,9.27Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M266.27,191.82a5.5,5.5,0,0,1,.38-.94c.3-.66.7-1.52,1.18-2.58l0,0,0,0,1-.84,0,0h0l12.88-2.33.24-.05.05.24.12.51v.08a4.33,4.33,0,0,1-1.77,2.52,16.71,16.71,0,0,1-2.64,1.69,39.88,39.88,0,0,1-5.22,2.29l.17-.25c.15,2.74.23,5.28.4,7.62a10.07,10.07,0,0,1-1.3,5.94,5.7,5.7,0,0,1-3.19,2.44,3,3,0,0,1-1.45.1,7.76,7.76,0,0,0,1.4-.27,5.66,5.66,0,0,0,3-2.44,9.92,9.92,0,0,0,1.14-5.76c-.2-2.27-.3-4.87-.47-7.61v-.19l.18-.06a38.91,38.91,0,0,0,5.15-2.27,16.64,16.64,0,0,0,2.56-1.63,3.9,3.9,0,0,0,1.58-2.17v.08q-.06-.27-.12-.51l.29.19L269,187.69l.07,0-1,.81,0-.05-1.3,2.53A5.38,5.38,0,0,1,266.27,191.82Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M219.27,224.94a18,18,0,0,1,4.2,1.07,17.75,17.75,0,0,1,4,1.57,18,18,0,0,1-4.2-1.07A17.75,17.75,0,0,1,219.27,224.94Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M227.29,228.25a13.44,13.44,0,0,1-4.53,1.16,13.63,13.63,0,0,1-4.68.06,45.47,45.47,0,0,1,4.61-.57C225.22,228.57,227.25,228.1,227.29,228.25Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M268.12,185.29l6-5.12,11.46,2.28-.63.94c-.89,1.36-2.56,1.59-4.18,1.59l-12.24.59"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M282,186.14s.33-.25.68-.86a5.5,5.5,0,0,0,.64-2.83l.25.2a59.52,59.52,0,0,1-5.89.92l-7.11.78a25.58,25.58,0,0,1-2.94.31,12.22,12.22,0,0,1,2.89-.67c1.81-.31,4.32-.61,7.09-.93,2.22-.26,4.26-.53,5.88-.82l.25-.05v.25a5.32,5.32,0,0,1-.86,3C282.44,186,282,186.17,282,186.14Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M322.55,256.19l12.37-4.51h0l14.37-18.83-24.72-21.31,5.21-11.87,30.89,13.7c4.54,1.87,9.79,4.09,12.27,8.33h0A22.43,22.43,0,0,1,376,233.06v2.79a22.46,22.46,0,0,1-5.19,14.35l-37.56,45.23Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M307.54,184.29l7.25-2.85a2.2,2.2,0,0,1,2.51.65l1.07,1.29,7.05,10-6.29,15.11-3.47-8.64-2.83-2.43s-3.79,1.67-4.26,1.27-1.36-2.3-1-2.77,4.53-2,4.53-2-6.25.3-6.56-.26-.95-2.11-.33-2.88,9-3.17,9-3.17l2.9,1.36-2.24-4.26S308.34,187.84,307.54,184.29Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M316.74,196.36s0-.34-.33-.78a4.27,4.27,0,0,0-1.51-1.37,4.32,4.32,0,0,0-2-.52c-.53,0-.84.1-.83.15a8.77,8.77,0,0,1,2.6.74A9.15,9.15,0,0,1,316.74,196.36Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M318.69,192.8a14.78,14.78,0,0,1-1.62-1.37,9.26,9.26,0,0,0-1.84-1.49,3.46,3.46,0,0,0-1.37-.45,3.67,3.67,0,0,0-1.53.24c-1.9.74-3.57,1.45-4.79,2a11.9,11.9,0,0,0-1.93.93,10.15,10.15,0,0,0,2-.66c1.24-.45,3-1.12,4.82-1.85a3.29,3.29,0,0,1,1.36-.22,3,3,0,0,1,1.22.38,9.82,9.82,0,0,1,1.82,1.37A4.09,4.09,0,0,0,318.69,192.8Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M319.12,190.5c.07-.08-.41-.6-1.08-1.15s-1.27-.93-1.34-.84.41.61,1.08,1.16S319.05,190.59,319.12,190.5Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <polygon
          points="322.77 189.6 329.78 198.76 336.76 202.59 329.66 215 322.66 209.42 319.13 208.53 319.13 208.53 315.66 199.89 322.77 189.6"
          style={{ fill: "#eb996e" }}
        ></polygon>
        <path
          d="M361.52,240.11a4.86,4.86,0,0,1-1.77-1.4,9.57,9.57,0,0,1-1.7-10.31,4.93,4.93,0,0,1,1.23-1.89c.08.05-.42.75-.88,2a10.1,10.1,0,0,0,1.63,9.93C360.88,239.53,361.57,240,361.52,240.11Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M371.36,223.88a4.22,4.22,0,0,1,1.4,1.25,9.39,9.39,0,0,1,1.52,8.67,4,4,0,0,1-.89,1.66c-.08-.05.25-.68.53-1.76a10.29,10.29,0,0,0-1.46-8.35C371.83,224.43,371.3,224,371.36,223.88Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M324.83,203.37a11.2,11.2,0,0,1-.91,2.39,13.15,13.15,0,0,1-.94,2.37,6.79,6.79,0,0,1,1.85-4.76Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M174.21,437.93c11.69,7.21,23.08,3.8,40.28,1l43.39-11.4,48.62-28.45-11.69-38.33-41.57-1.61L182.32,395c-11,6.45-13.77,13.8-16,21.12a19.11,19.11,0,0,0,2.43,16.68A18.76,18.76,0,0,0,174.21,437.93Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M239,422.91a9.79,9.79,0,0,1-1.64.6c-1.06.35-2.61.84-4.53,1.42-3.84,1.16-9.17,2.67-15.1,4.18s-11.33,2.71-15.26,3.52c-2,.41-3.55.72-4.66.91a12.28,12.28,0,0,1-1.72.26,9.94,9.94,0,0,1,1.68-.46l4.62-1.07c3.91-.9,9.29-2.17,15.22-3.67s11.26-3,15.12-4l4.57-1.26A11.58,11.58,0,0,1,239,422.91Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M179.58,432.06a3.93,3.93,0,0,1-1.11-.17,12.11,12.11,0,0,1-2.84-1.14,13,13,0,0,1-5.37-17.58,11.78,11.78,0,0,1,1.73-2.52,3.51,3.51,0,0,1,.82-.76,20.7,20.7,0,0,0-2.22,3.45,13,13,0,0,0,5.22,17.1A21.42,21.42,0,0,0,179.58,432.06Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M355.78,392.21a7.9,7.9,0,0,1,1.77-2.59,1.26,1.26,0,0,1,1.65.35,1.68,1.68,0,0,1-.38,1.77,3.72,3.72,0,0,0-1,1.64"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M361.09,395a8,8,0,0,1,1.78-2.59,1.26,1.26,0,0,1,1.65.35,1.68,1.68,0,0,1-.39,1.78,3.7,3.7,0,0,0-1,1.63"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M333.8,385.09a8,8,0,0,1,1.78-2.59,1.26,1.26,0,0,1,1.65.35,1.68,1.68,0,0,1-.39,1.78,3.7,3.7,0,0,0-1,1.63"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M350.29,388.68a3.49,3.49,0,0,1,2.92-1.27c.26,0,.55.09.65.33a.78.78,0,0,1-.17.69,10.92,10.92,0,0,1-1.8,2"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M327.14,384c.69-.86,3-2.63,4.14-2.55.26,0,.56.09.66.33a.79.79,0,0,1-.18.69,10,10,0,0,1-1.8,2"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M323,387.75l2-5.41,13.76,2a10.44,10.44,0,0,0,2.83,2.43c.34.18,5.25.45,5.25.45,5.84,2.08,15,6.69,18.47,8a5.35,5.35,0,0,1,2.29,1.7l1.56,2A5.32,5.32,0,0,1,370,404h0a5.3,5.3,0,0,1-5.11,3.51l-46.53-1.05Z"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M311.32,449l26.57-42.43-12-2-1.22-32.68-50.94,1.62-17.14,62.88a24.23,24.23,0,0,0,11.56,27.54l.39.22S297.67,471.21,311.32,449Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <path
          d="M337.8,407.48s2-9.32-2.23-10.75-10,1.2-10,1.2l.24,6.64-14.61,24.65,7.16,8.49Z"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M338.45,399.82a6.81,6.81,0,0,0-4.91,7.79,3.39,3.39,0,0,0,2.13,2.83c1.18.3,2.36-.41,3.38-1.09l3.29-2.21"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M303.16,453.38a99.59,99.59,0,0,1,2.28-9.93,98,98,0,0,1,2.78-9.8,98.9,98.9,0,0,1-2.28,9.93A100.24,100.24,0,0,1,303.16,453.38Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M306.39,441.07a6.85,6.85,0,0,1-.54,2.17,21.25,21.25,0,0,1-2.45,4.82,21.47,21.47,0,0,1-3.57,4.05,7.32,7.32,0,0,1-1.82,1.3,30.22,30.22,0,0,0,8.38-12.34Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M284.76,459.8a2.51,2.51,0,0,1-.86.2,12.64,12.64,0,0,1-2.41.11,14.64,14.64,0,0,1-12.61-8.54,12.74,12.74,0,0,1-.79-2.28,2.59,2.59,0,0,1-.13-.87c.09,0,.35,1.21,1.26,3a15.19,15.19,0,0,0,12.3,8.33C283.51,459.92,284.75,459.7,284.76,459.8Z"
          style={{ fill: "#d1734a" }}
        ></path>
        <path
          d="M345.77,407.11c-.15-.05.26-1.39.09-3.07s-.8-2.92-.67-3a4.44,4.44,0,0,1,1.19,2.95A4.38,4.38,0,0,1,345.77,407.11Z"
          style={{ fill: "#fff" }}
        ></path>
        <path
          d="M351.12,407.37c-.15,0,.19-1.51,0-3.33s-.8-3.19-.66-3.26a5.4,5.4,0,0,1,1.18,3.21A5.23,5.23,0,0,1,351.12,407.37Z"
          style={{ fill: "#fff" }}
        ></path>
        <path
          d="M355.84,407.27a12.94,12.94,0,0,0,.29-3.26,13.18,13.18,0,0,0-1-3.12s.35.2.7.73a5.49,5.49,0,0,1,.54,4.77C356.15,407,355.9,407.3,355.84,407.27Z"
          style={{ fill: "#fff" }}
        ></path>
        <path
          d="M342,406.1a8.68,8.68,0,0,0-2-4.82c.06-.13,1.23.57,1.83,2.06A3.27,3.27,0,0,1,342,406.1Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M338.24,400a14.28,14.28,0,0,0-1.25-1.73,7.21,7.21,0,0,0-4.5-2.08,11.15,11.15,0,0,0-5,.88,20.3,20.3,0,0,1-2,.83,5.84,5.84,0,0,1,1.85-1.17,10.16,10.16,0,0,1,5.19-1.06,7,7,0,0,1,4.73,2.36A3.55,3.55,0,0,1,338.24,400Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M325,382.34l13.76,2,3.24,2.17,5.15.41,19.64,9s4.85,3.32,3.39,7.3-3,3.85-3,3.85,2.54-3.13,1.81-5.52-3.49-4.59-6.84-5.87l-16.92-6.16s-4.88.44-6,0-2.94-2.93-2.94-2.93l-11.27.09Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M355.19,395.67A51.68,51.68,0,0,1,342.26,393a61.56,61.56,0,0,1,6.49,1.25A60.9,60.9,0,0,1,355.19,395.67Z"
          style={{ fill: "#fff" }}
        ></path>
        <path
          d="M320.92,434.55c-.12.09-1.72-1.95-3.85-4.33s-4-4.19-3.89-4.3a31.68,31.68,0,0,1,7.74,8.63Z"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M323.45,429.69a30.81,30.81,0,0,1-4.2-3.71,31.3,31.3,0,0,1-3.83-4.09,30.81,30.81,0,0,1,4.2,3.71A31.3,31.3,0,0,1,323.45,429.69Z"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M238.52,366.24,198.3,385,192,390c25-10.37,46,11,44,33.8l22.95-7.23-1.19,15.53s9.66-24.35,27-23.15,24,24.43,24,24.43l17.08-28.83-.95-32.75Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M286,390s-.13.11-.41.28a11.07,11.07,0,0,1-1.25.62,20.31,20.31,0,0,1-5,1.29c-2.14.35-4.72.48-7.48,1.12a16.24,16.24,0,0,0-4.12,1.53,9.28,9.28,0,0,0-3.39,3.15,17.23,17.23,0,0,0-1.88,4.33c-.46,1.48-.86,2.92-1.22,4.3-.73,2.75-1.28,5.26-1.71,7.38s-.7,3.83-.9,5a14.27,14.27,0,0,1-.35,1.85,2.6,2.6,0,0,1,0-.49c0-.32.07-.79.14-1.39.14-1.2.37-2.93.74-5.06s.89-4.66,1.6-7.43c.35-1.39.75-2.83,1.2-4.33a17.57,17.57,0,0,1,1.93-4.46,9.71,9.71,0,0,1,3.58-3.32,16.56,16.56,0,0,1,4.27-1.55c2.82-.62,5.4-.71,7.53-1a23,23,0,0,0,5-1.12C285.35,390.3,285.93,390,286,390Z"
          style={{ fill: "#455a64" }}
        ></path>
        <path
          d="M250.82,386.42a4.44,4.44,0,0,1,.83.71,10.27,10.27,0,0,1,.89.93,15.05,15.05,0,0,1,1.07,1.33,22.13,22.13,0,0,1,2.28,3.81,25.81,25.81,0,0,1,1.72,5.16,25.49,25.49,0,0,1,.5,5.42,21.66,21.66,0,0,1-.54,4.4,16.54,16.54,0,0,1-.45,1.65,10.72,10.72,0,0,1-.44,1.21,4.68,4.68,0,0,1-.47,1c-.1,0,.52-1.48,1-3.92a25.33,25.33,0,0,0,.42-4.34,24.84,24.84,0,0,0-2.18-10.37,24.63,24.63,0,0,0-2.14-3.8C251.89,387.56,250.74,386.49,250.82,386.42Z"
          style={{ fill: "#455a64" }}
        ></path>
        <path
          d="M308.72,388a9.39,9.39,0,0,1-1.41-.71,34,34,0,0,0-3.92-1.76,31.49,31.49,0,0,0-27.24,2.3,32.91,32.91,0,0,0-3.56,2.39,14.39,14.39,0,0,1-1.27.94s.08-.12.27-.31.48-.47.87-.79a28.31,28.31,0,0,1,3.5-2.55,30.53,30.53,0,0,1,27.56-2.32,27.29,27.29,0,0,1,3.88,1.92,11.06,11.06,0,0,1,1,.64A1.3,1.3,0,0,1,308.72,388Z"
          style={{ fill: "#455a64" }}
        ></path>
        <path
          d="M256.89,373.68a8.5,8.5,0,0,1,1.6,2.06,22.53,22.53,0,0,1,2.54,5.77,22.14,22.14,0,0,1,.82,6.25,8.61,8.61,0,0,1-.29,2.59,28.32,28.32,0,0,0-4.67-16.67Z"
          style={{ fill: "#455a64" }}
        ></path>
        <g style={{ opacity: "0.7000000000000001" }}>
          <path
            d="M337.8,407.48s2-9.32-2.23-10.75-10,1.2-10,1.2l.24,6.64-14.61,24.65,7.16,8.49Z"
            style={{ fill: "#fff" }}
          ></path>
        </g>
        <path
          d="M324.61,371.89l7.63-2,1-113-25.21-3.71-30.92.49-5.49,4.05L256,273.08l2.77,41.71,1.38,11.3-19.81,34.1-4.21,3.72,2.36,2.33c11.5,1.28,67.51,7.25,68.37,5.58l8.56.51Z"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M311.82,313.6a1.68,1.68,0,0,1-.31.35l-.95.95a17,17,0,0,1-1.57,1.43c-.64.53-1.34,1.17-2.19,1.77s-1.76,1.31-2.8,1.95-2.18,1.32-3.38,2a53.26,53.26,0,0,1-8.28,3.49,53.8,53.8,0,0,1-8.77,1.9c-1.38.14-2.68.29-3.91.31s-2.38.05-3.42,0-2-.12-2.81-.19a18.66,18.66,0,0,1-2.11-.26l-1.32-.23c-.3-.06-.46-.1-.45-.12a1.67,1.67,0,0,1,.47,0l1.33.14c.58.07,1.28.14,2.11.17s1.75.14,2.79.11,2.17,0,3.39-.07,2.5-.21,3.86-.35a50.86,50.86,0,0,0,16.9-5.34c1.2-.66,2.35-1.26,3.37-1.93s2-1.28,2.81-1.89,1.57-1.19,2.23-1.69,1.19-1,1.62-1.36l1-.87A1.73,1.73,0,0,1,311.82,313.6Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M280.25,253.65l-3.1-3.05h-3.61l-20.19-10.49s-15.2,32.29-18.56,33.07l26.07,14.7,17.72-12.07Z"
          style={{ fill: "#0E794E" }}
        ></path>
        <path
          d="M283.22,258.7h0a10.5,10.5,0,0,0,10,5.6h0a11.39,11.39,0,0,0,4.51-1.31,52.82,52.82,0,0,0,14.32-7.64l.52-4.56-29.36.73Z"
          style={{ fill: "#eb996e" }}
        ></path>
        <polygon
          points="315.7 254.34 319.66 250.76 325.01 252.22 334.73 248.49 341.45 239.18 356.36 273.21 334.34 293.9 329.71 303.15 315.7 254.34"
          style={{ fill: "#0E794E" }}
        ></polygon>
        <path
          d="M322,267.13a69,69,0,0,1-3-6.54,66.2,66.2,0,0,1-2.81-6.62,8,8,0,0,1,1.08,1.81c.61,1.16,1.4,2.78,2.2,4.6s1.48,3.5,1.93,4.72A8.11,8.11,0,0,1,322,267.13Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M332.35,271.61c-.08,0-.19-1.18-.55-3.06A34.95,34.95,0,0,0,326,254.91c-1.1-1.57-1.88-2.47-1.81-2.53a3.13,3.13,0,0,1,.62.57,21.43,21.43,0,0,1,1.49,1.74,29.55,29.55,0,0,1,3.79,6.52,30.11,30.11,0,0,1,2,7.28,20.81,20.81,0,0,1,.21,2.27A2.39,2.39,0,0,1,332.35,271.61Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M338.89,275.35c.07.08-1.15,1.17-2.75,3.24a30.17,30.17,0,0,0-2.5,3.84,29.79,29.79,0,0,0-3.43,10.63,30.31,30.31,0,0,0-.22,4.58c.09,2.62.44,4.22.34,4.24a4.77,4.77,0,0,1-.3-1.12,10.61,10.61,0,0,1-.22-1.32,16.78,16.78,0,0,1-.19-1.78,26.77,26.77,0,0,1,.11-4.66,30,30,0,0,1,1.2-5.57,30.38,30.38,0,0,1,2.29-5.23,27.93,27.93,0,0,1,2.63-3.84c.41-.52.83-.95,1.19-1.33a12,12,0,0,1,1-.95A5.87,5.87,0,0,1,338.89,275.35Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M256.58,264.79c.14,0,.38,4.58.53,10.23a102.06,102.06,0,0,1,0,10.25,98.82,98.82,0,0,1-.53-10.23A102.06,102.06,0,0,1,256.58,264.79Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M276.33,266.28a35,35,0,0,1,3.54-12.65c.14.06-.9,2.82-1.87,6.3S276.48,266.31,276.33,266.28Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M272.45,267.47a7.82,7.82,0,0,1,.35-2.32,21.83,21.83,0,0,1,2.12-5.26,28.39,28.39,0,0,1,3.28-4.61,8.86,8.86,0,0,1,1.67-1.65c.14.12-2.34,2.72-4.5,6.52A40,40,0,0,0,272.45,267.47Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M315.06,259.54a8.51,8.51,0,0,1-1,1.06c-.67.66-1.68,1.57-2.95,2.67a91.41,91.41,0,0,1-10.58,7.78,89.92,89.92,0,0,1-11.58,6.18c-1.54.68-2.8,1.19-3.68,1.51a8,8,0,0,1-1.39.46,7.52,7.52,0,0,1,1.31-.65c.86-.37,2.09-.94,3.61-1.65A107.66,107.66,0,0,0,310.86,263c1.3-1.05,2.34-1.92,3.05-2.53A7.75,7.75,0,0,1,315.06,259.54Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M290.9,306.63l-4.82,10.85h-4.89l4.37-9.8"
          style={{ fill: "#fff" }}
        ></path>
        <path
          d="M309.93,301.64a6,6,0,0,1-1.26.46c-.82.27-2,.63-3.51,1.06-3,.85-7.11,1.95-11.71,3s-8.79,1.93-11.84,2.48c-1.52.28-2.75.49-3.61.62a7.26,7.26,0,0,1-1.34.15,6.14,6.14,0,0,1,1.3-.35l3.58-.78c3-.64,7.2-1.55,11.79-2.63s8.74-2.11,11.73-2.88l3.55-.89A6.79,6.79,0,0,1,309.93,301.64Z"
          style={{ fill: "#263238" }}
        ></path>
        <path
          d="M301,292.05v3.07l-4.77,10.33-5.44,1.18,5-10.7h-9.68v4.19h-4.27v-8.07Z"
          style={{ fill: "#fff" }}
        ></path>
        <g style={{ opacity: "0.30000000000000004" }}>
          <path d="M272.49,327.41a4.65,4.65,0,0,1-.85-7c1.93-1.87,5.08-1.61,7.64-.77s5.09,2.14,7.78,1.95c5.17-.37,8.45-5.93,13.39-7.5a3.79,3.79,0,0,1,3.18.15c1.44.93,1.4,3.19.36,4.56a12.32,12.32,0,0,1-4.55,3.62c-9.42,3.71-19.19,6.54-29.16,4.78"></path>
        </g>
        <g style={{ opacity: "0.30000000000000004" }}>
          <path d="M277.85,254.14A24,24,0,0,0,270,271a6.74,6.74,0,0,0,.66,3.66,2.86,2.86,0,0,0,3.15,1.49c1.3-.4,1.9-1.85,2.33-3.13q2.42-7.1,4.82-14.19a8.22,8.22,0,0,0,.6-2.66,2.9,2.9,0,0,0-1.07-2.41,1.78,1.78,0,0,0-2.44.32"></path>
        </g>
        <path
          d="M312.61,255.11a6.4,6.4,0,0,1-1.06.81c-.7.5-1.72,1.2-3,2a49.34,49.34,0,0,1-10.74,5.4,15.59,15.59,0,0,1-6.6.89,11.39,11.39,0,0,1-5.09-1.9,10.11,10.11,0,0,1-2.62-2.57,7.93,7.93,0,0,1-.5-.86c-.09-.21-.14-.32-.12-.33a12,12,0,0,0,3.44,3.45,11.24,11.24,0,0,0,4.95,1.73,15.52,15.52,0,0,0,6.38-.9,54.73,54.73,0,0,0,10.7-5.23l3.1-1.89A6.83,6.83,0,0,1,312.61,255.11Z"
          style={{ fill: "#263238" }}
        ></path>
      </g>
    </svg>
  );
}

export default RegisterPage;
