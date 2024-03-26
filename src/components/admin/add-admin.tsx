/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/utils/ui/form";
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
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";
import * as z from "zod";
import { FileInput } from "../file-input";
import { Icons } from "@/icons";

const formSchema = z.object({
  fullName: z.string(),
  genre: z.string(),
  password: z.string(),
  email: z.string(),
});

export type PlayerFormValue = z.infer<typeof formSchema>;

const AddAdminDialog = ({ open, setOpen, actions, role }: any) => {
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const [posting, setPosting] = useState(false);
  const { authAxios }: any = useAxios();

  // create new form state
  const form = useForm<PlayerFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: undefined,
      email: undefined,
      password: undefined,
    },
  });

  // on submit action
  const onSubmit = async (payload: PlayerFormValue) => {
    if (validateImage(avatar, setAvatarError)) {
      try {
        setPosting(true);
        const formData = new FormData();
        formData.append("fullName", payload.fullName);
        formData.append("email", payload.email);
        formData.append("password", payload.password);
        formData.append("avatar", avatar);
        formData.append("role", role);

        const response = await authAxios.post("/user/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setOpen(false);
        form.reset();
        setAvatar(null);
        toast.success(response.data.message);
        actions.fetchAdmin();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setPosting(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95%] h-fit  md:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Create a Admin</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="max-h-full h-full overflow-hidden mt-3">
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
                            disabled={posting}
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
                            disabled={posting}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminDialog;
