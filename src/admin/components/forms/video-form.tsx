/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/lib/utils/ui/separator";
import { Textarea } from "@/lib/utils/ui/textarea";
import { Heading } from "@/lib/utils/ui/heading";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { Label } from "@/lib/utils/ui/label";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/utils/ui/form";
import * as z from "zod";
// import { useToast } from "@/lib/utils/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(10, { message: "Please enter video title!" }),
  description: z
    .string()
    .min(10, { message: "Please enter video description!" }),
  thumbnail: z.string().url({ message: "Please enter a valid image URL" }),
  video: z.string().url({ message: "Please enter a valid image URL" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export const VideoAddForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  //   const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Video" : "Add Video";
  const description = initialData ? "Edit a video." : "Add a new video";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        title: "",
        description: "",
        thumbnail: "",
        video: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log(open);
    try {
      console.log(data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />
      <Form {...form}>
        <ScrollArea className="h-full">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-1 space-y-8 w-full relative"
          >
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 md:gap-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Title</Label>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <Label>Avatar</Label>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={loading}
                        {...field}
                        accept=".jpg, .jpeg, .png"
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <Label>Avatar</Label>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={loading}
                        {...field}
                        accept=".jpg, .jpeg, .png"
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Description</Label>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      {...field}
                      placeholder="Description of the video"
                    />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className="ml-auto min-w-fit w-1/4"
              type="submit"
            >
              {action}
            </Button>
          </form>
        </ScrollArea>
      </Form>
    </>
  );
};
