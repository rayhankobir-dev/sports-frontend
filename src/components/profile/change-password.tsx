/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff, KeyRound, LockKeyhole } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/lib/utils/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/utils/ui/form";
import { Input } from "@/lib/utils/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { Button } from "@/lib/utils/ui/button";
import toast from "react-hot-toast";
import SpinerLoading from "../spiner-loading";
import useAxios from "@/hooks/useAxios";

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z.string().min(6, { message: "New password is required" }),
    confirmPassword: z.string().min(1, { message: "Re-type the new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(true);
  const [showNewPass, setShowNewPass] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const { authAxios }: any = useAxios();

  // create new form state
  const form = useForm<FormValues>({
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: FormValues) => {
    const { currentPassword, newPassword } = data;
    try {
      setLoading(true);
      const response = await authAxios.put("/user/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex-1 py-5 h-fit col-span-5 md:col-span-2">
      <CardContent>
        <CardTitle>Change Your Password</CardTitle>
        <CardDescription className="mt-2">
          Edit your personal information
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col gap-1 py-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full relative"
          >
            <div className="grid gap-y-2">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <div className="relative group">
                        <LockKeyhole className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-12 h-12 rounded-xl "
                          type={showCurrentPass ? "password" : "text"}
                          disabled={loading}
                          placeholder="Current Password"
                          {...field}
                        />
                        {showCurrentPass ? (
                          <Eye
                            onClick={() => {
                              setShowCurrentPass(false);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => {
                              setShowCurrentPass(true);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="font-light px-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <div className="relative group">
                        <KeyRound className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-12 h-12 rounded-xl "
                          type={showNewPass ? "password" : "text"}
                          disabled={loading}
                          placeholder="New Password"
                          {...field}
                        />
                        {showNewPass ? (
                          <Eye
                            onClick={() => {
                              setShowNewPass(false);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => {
                              setShowNewPass(true);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="font-light px-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <div className="relative group">
                        <KeyRound className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-12 h-12 rounded-xl "
                          type={showConfirmPass ? "password" : "text"}
                          disabled={loading}
                          placeholder="Re-type Password"
                          {...field}
                        />
                        {showConfirmPass ? (
                          <Eye
                            onClick={() => {
                              setShowConfirmPass(false);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => {
                              setShowConfirmPass(true);
                            }}
                            className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                          />
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
              className="ml-auto h-11 min-w-fit w-full md:w-1/4 rounded-xl"
              type="submit"
            >
              {loading ? (
                <SpinerLoading text="Changing.." textHidden={false} />
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
