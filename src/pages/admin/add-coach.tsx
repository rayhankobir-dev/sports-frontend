/* eslint-disable @typescript-eslint/no-explicit-any */
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
import SpinerLoading from "@/components/spiner-loading";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/lib/utils/ui/heading";
import { Button } from "@/lib/utils/ui/button";
import { Label } from "@/lib/utils/ui/label";
import { Input } from "@/lib/utils/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";
import * as z from "zod";
import { Separator } from "@/lib/utils/ui/separator";

const formSchema = z.object({
  fullName: z.string(),
  genre: z.string(),
  password: z.string(),
  email: z.string(),
});

export type PlayerFormValue = z.infer<typeof formSchema>;

const AddCoach = () => {
  const [fetching, setFetching] = useState(true);
  const [posting, setPosting] = useState(false);
  const [genres, setGenres] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const { authAxios }: any = useAxios();

  const defaultValues = {
    fullName: undefined,
    email: undefined,
    password: undefined,
    genre: undefined,
  };

  // create new form state
  const form = useForm<PlayerFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    async function fetchGenre() {
      setFetching(true);
      const response = await authAxios.get("/genre");
      setGenres(response.data.data.genres);
      setFetching(false);
    }

    fetchGenre();
  }, [authAxios]);

  // on submit action
  const onSubmit = async (payload: PlayerFormValue) => {
    if (validateAvatar(avatar)) {
      try {
        setPosting(true);
        const formData = new FormData();
        formData.append("fullName", payload.fullName);
        formData.append("email", payload.email);
        formData.append("password", payload.password);
        formData.append("genre", payload.genre);
        formData.append("avatar", avatar);
        formData.append("role", "coach");

        const response = await authAxios.post("/user/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(response.data.message);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      } finally {
        setPosting(false);
      }
    }
  };

  function validateAvatar(avatar: any): boolean {
    const maxSize = 5 * 1024 * 1024;
    if (!avatar) {
      setAvatarError("Avatar is required");
      return false;
    } else if (avatar.size > maxSize) {
      setAvatarError("Avatar exceeds maximum file size (5MB)");
      return false;
    } else {
      const allowedFormats = ["jpg", "jpeg", "png", "webp"];
      const fileNameParts = avatar.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        setAvatarError(
          "Avatar image format is not supported(jpg,jpeg,png,webp)"
        );
        return false;
      }
      setAvatarError("");
      return true;
    }
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  return (
    <div>
      <Heading
        title="Add Coach"
        description="Please fill all information about the admin"
      />
      <Separator className="my-4" />
      {fetching ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <SpinerLoading size={30} className="text-green-600" />
        </div>
      ) : (
        <Form {...form}>
          <ScrollArea className="h-full mt-3">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-1 space-y-8 w-full relative"
            >
              <div className="grid md:grid-cols-2 gap-3">
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Full name</Label>
                        <FormControl>
                          <Input
                            type="text"
                            className="h-12 rounded-xl"
                            placeholder="Enter full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                          <Input
                            disabled={fetching}
                            placeholder="Email address"
                            className="h-12 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={fetching}
                            placeholder="Enter default password"
                            className="h-12 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Genre</Label>
                        <Select
                          disabled={fetching}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl className="h-12 rounded-xl">
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Slect genre of Content"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genres?.map((genre: any) => (
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
                </div>

                <div className="md:col-span-2">
                  <FormItem>
                    <Label>Avatar</Label>
                    <Input
                      name="avatar"
                      type="file"
                      className="cols-span-1 h-20 rounded-xl"
                      onChange={handleImageChange}
                      placeholder="Upload your content thumbnail"
                    />
                    <Label className="font-light text-rose-500">
                      {avatarError && avatarError}
                    </Label>
                  </FormItem>
                </div>
              </div>

              <Button
                disabled={posting}
                className="ml-auto min-w-fit w-1/4"
                type="submit"
              >
                {posting ? (
                  <SpinerLoading text="Creating.." textHidden={false} />
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </ScrollArea>
        </Form>
      )}
    </div>
  );
};

export default AddCoach;
