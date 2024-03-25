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
import SpinerLoading from "@/components/spiner-loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/utils/ui/button";
import { Label } from "@/lib/utils/ui/label";
import { Input } from "@/lib/utils/ui/input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/utils";

const formSchema = z.object({
  genre: z
    .string()
    .min(4, { message: "Genre name must contain at least 3 character" }),
});

export type PlayerFormValue = z.infer<typeof formSchema>;

const CreateGenre = ({ open, setOpen, actions }: any) => {
  const [posting, setPosting] = useState(false);

  // create new form state
  const form = useForm<PlayerFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genre: undefined,
    },
  });

  // on submit action
  const onSubmit = async (payload: PlayerFormValue) => {
    try {
      setPosting(true);
      actions.createGenre(payload.genre);
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setPosting(false);
    }
  };

  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const genreValue = form.watch("genre") || "";
    setSlug(slugify(genreValue));
  }, [form.watch("genre")]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95%] h-fit  md:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Create a Genre</DialogTitle>
          <DialogDescription>
            Provide genre information about & make sure genre slug.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 px-1 space-y-8 w-full relative"
          >
            <div className="grid md:grid-cols-2 gap-3">
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Genre name</Label>
                      <FormControl>
                        <Input
                          type="text"
                          className="h-12 rounded-xl"
                          placeholder="Enter genre name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-light" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1">
                <FormItem>
                  <Label>Slug(auto generated)</Label>
                  <FormControl>
                    <Input
                      readOnly={true}
                      className="h-12 rounded-xl"
                      placeholder="Slug of genre"
                      value={slug}
                    />
                  </FormControl>
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGenre;
