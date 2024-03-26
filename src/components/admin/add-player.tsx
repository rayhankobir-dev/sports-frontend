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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/lib/utils/ui/dialog";
import { validateImage } from "@/validation/video.validation";
import SpinerLoading from "@/components/spiner-loading";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/utils/ui/button";
import { Label } from "@/lib/utils/ui/label";
import { Input } from "@/lib/utils/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FileInput } from "../file-input";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { Icons } from "@/icons";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string(),
  genre: z.string(),
  password: z.string(),
  email: z.string(),
});

export type PlayerFormValue = z.infer<typeof formSchema>;

const AddPlayerDialog = ({ title, open, setOpen, actions, role }: any) => {
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [posting, setPosting] = useState(false);
  const [genres, setGenres] = useState([]);
  const { authAxios }: any = useAxios();

  // create new form state
  const form = useForm<PlayerFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: undefined,
      email: undefined,
      password: undefined,
      genre: undefined,
    },
  });

  useEffect(() => {
    async function fetchGenre() {
      try {
        setFetching(true);
        const response = await authAxios.get("/genre");
        setGenres(response.data.data.genres);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    }

    fetchGenre();
  }, [authAxios]);

  // on submit action
  const onSubmit = async (payload: PlayerFormValue) => {
    console.log(actions);
    if (validateImage(avatar, setAvatarError)) {
      try {
        setPosting(true);
        const formData = new FormData();
        formData.append("fullName", payload.fullName);
        formData.append("email", payload.email);
        formData.append("password", payload.password);
        formData.append("genre", payload.genre);
        formData.append("avatar", avatar);
        formData.append("role", role);

        actions.createUser(formData);

        setOpen(false);
        form.reset();
        setAvatar(null);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setPosting(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95%] h-[90%] md:h-fit  md:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
          <DialogDescription className="text-left">
            Please fill all information and create a new user.
          </DialogDescription>
        </DialogHeader>

        {fetching ? (
          <div className="w-full h-full flex justify-center items-center">
            <SpinerLoading className="text-green-600" />
          </div>
        ) : (
          <Form {...form}>
            <ScrollArea className="max-h-full h-[95%] md:h-fit overflow-hidden mt-3">
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
                      <FileInput
                        fieldName="avatar"
                        maxSize={500000000}
                        setError={setAvatarError}
                        setOnChange={setAvatar}
                        supportedExtensions={["png", "jpg", "jpeg", "webp"]}
                        Icon={Icons.image}
                      />
                      <Label className="font-light text-rose-500">
                        {avatarError && avatarError}
                      </Label>
                    </FormItem>
                  </div>
                </div>

                <Button
                  disabled={posting}
                  className="ml-auto min-w-fit w-full  md:w-2/4"
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
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayerDialog;
