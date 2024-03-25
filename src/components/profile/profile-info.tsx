/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/utils/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import SpinerLoading from "../spiner-loading";
import { Input } from "@/lib/utils/ui/input";
import { Button } from "@/lib/utils/ui/button";
import { Label } from "@/lib/utils/ui/label";
import { useForm } from "react-hook-form";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";
import * as z from "zod";
import toast from "react-hot-toast";

// schema
const formSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email({ message: "Please enter valid email address" }),
  genre: z.string().optional(),
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  country: z.string().min(2, { message: "Country is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function PersonalInformation() {
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const { auth, setAuth }: any = useAuth();
  const { authAxios, publicAxios }: any = useAxios();

  useEffect(() => {
    async function fetctGenres() {
      try {
        const response = await publicAxios.get("/genre");
        const countryResponse = await publicAxios.get(
          "https://restcountries.com/v3.1/all"
        );
        setCountries(countryResponse.data);
        setGenres(response.data.data.genres);
      } catch (error: any) {
        console.log(error.response);
      } finally {
        setFetching(false);
      }
    }

    fetctGenres();
  }, [authAxios, publicAxios]);

  // default
  const defaultValues = {
    fullName: auth.user?.fullName || undefined,
    genre: auth?.user?.genre?._id || undefined,
    email: auth.user?.email || undefined,
    height: String(auth.user?.height) || undefined,
    weight: String(auth.user?.weight) || undefined,
    country: auth.user?.country || undefined,
  };

  // create new form state
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setUpdating(true);
      const response = await authAxios.put("/user/update-profile", {
        ...data,
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
      });
      toast.success(response.data.message);
      const res = await authAxios.get("/user/profile");

      setAuth((current: any) => {
        return { ...current, user: res.data.data.user };
      });
    } catch (error: any) {
      toast.success(error.response.data.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Fragment>
      {fetching ? (
        <div className="w-full flex justify-center">
          <SpinerLoading size={30} className="text-green-600 mt-10" />
        </div>
      ) : (
        <Fragment>
          <CardContent className="py-5 mb-8">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Edit your personal information</CardDescription>
          </CardContent>
          <CardFooter className="px-3 md:px-5 flex flex-col gap-1 py-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="px-1 space-y-4 w-full relative"
              >
                <div className="grid md:grid-cols-4 gap-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-2 space-y-1">
                        <Label>Full Name</Label>
                        <FormControl>
                          <Input
                            className="h-12 rounded-xl"
                            disabled={updating}
                            placeholder="Full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-2 space-y-1">
                        <Label className="px-1">Email</Label>
                        <FormControl>
                          <Input
                            className="h-12 rounded-xl"
                            readOnly={true}
                            disabled={updating}
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-2 space-y-1">
                        <Label>Height</Label>
                        <FormControl>
                          <Input
                            type="number"
                            className="h-12 rounded-xl"
                            disabled={updating}
                            placeholder="Your height (inches)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-2 space-y-1">
                        <Label>Weight</Label>
                        <FormControl>
                          <Input
                            type="number"
                            className="h-12 rounded-xl"
                            disabled={updating}
                            placeholder="Your weight (kg)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-2 space-y-1">
                        <Label className="px-1">Genre</Label>
                        <Select
                          disabled={updating || fetching}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={auth.user?.genre?._id}
                        >
                          <FormControl className="h-12 rounded-xl">
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={auth.user?.genre?.name}
                                placeholder="Select genre"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genres?.length > 0 &&
                              genres.map((genre: any) => (
                                <SelectItem key={genre._id} value={genre._id}>
                                  {genre.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-2 space-y-1">
                        <Label className="px-1">Country</Label>
                        <Select
                          disabled={updating || fetching}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={auth?.user?.country}
                        >
                          <FormControl className="h-12 rounded-xl">
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={auth.user?.genre?.name}
                                placeholder="Select country"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries?.length > 0 &&
                              countries.map((country: any, index: any) => (
                                <SelectItem
                                  key={index}
                                  value={country?.name?.common}
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={country?.flags?.svg}
                                      className="h-6 w-auto rounded-sm"
                                    />
                                    {country?.name?.common}
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={updating}
                  className="h-11 rounded-xl min-w-fit w-full md:w-1/4"
                  type="submit"
                >
                  {updating ? (
                    <SpinerLoading text="Save Changing.." textHidden={false} />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Fragment>
      )}
    </Fragment>
  );
}
