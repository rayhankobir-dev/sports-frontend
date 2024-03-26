/* eslint-disable @typescript-eslint/no-explicit-any */
import SpinerLoading from "@/components/spiner-loading";
import { Button } from "@/lib/utils/ui/button";
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
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { Textarea } from "@/lib/utils/ui/textarea";
import { Label } from "@/lib/utils/ui/label";
import { Input } from "@/lib/utils/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as z from "zod";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/utils/ui/dialog";
import { useVideo } from "@/hooks/useVideo";
import MediaPreview from "@/components/media-preview";
import { FileInput } from "../file-input";
import { Icons } from "@/icons";

const formSchema = z.object({
  title: z.string().min(10, {}),
  genre: z.string(),
  description: z.string().min(10, {}),
});

export type VideoFormValue = z.infer<typeof formSchema>;

const EditVideo = ({ open, setOpen, initialData }: any) => {
  const [fetching, setFetching] = useState(true);
  const [posting, setPosting] = useState(false);
  const [genres, setGenres] = useState([]);
  const [thumbnail, setThumbnail]: any = useState<any>(null);
  const [thumbnailError, setThumbnailError] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const [videoError, setVideoError] = useState<any>(null);
  const { authAxios }: any = useAxios();
  const { fetchVideos }: any = useVideo();

  const defaultValues = {
    title: initialData.title || undefined,
    description: initialData.description || undefined,
    genre: initialData.genre?._id || undefined,
  };

  // create new form state
  const form = useForm<VideoFormValue>({
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
  const onSubmit = async (payload: VideoFormValue) => {
    try {
      setPosting(true);
      const formData = new FormData();
      formData.append("videoId", initialData._id);
      formData.append("title", payload.title);
      formData.append("genre", payload.genre);
      formData.append("description", payload.description);
      formData.append("thumbnail", thumbnail);
      formData.append("file", video);

      const response = await authAxios.put("/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchVideos();
      toast.success(response.data.message);
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="px-0 max-w-[95%] h-[90%] max-h-fit md:h-fit md:max-w-lg rounded-xl overflow-hidden">
        <DialogHeader className="px-4">
          <DialogTitle className="text-left">Edit the Video</DialogTitle>
          <DialogDescription className="text-left">
            Make changes to your video here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {fetching ? (
          <div className="w-full h-full flex justify-center items-center ">
            <SpinerLoading className="text-green-600" />
          </div>
        ) : (
          <ScrollArea className="h-[95%] md:h-fit mt-3 overflow-hidden">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-3 px-4">
                  <div className="col-span-2 md:col-span-1">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <Label>Video Title</Label>
                          <FormControl>
                            <Input
                              type="text"
                              className="cols-span-1 h-12 rounded-xl"
                              placeholder="Title of the video"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="font-light" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
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

                  <div className="col-span-2">
                    <FormItem>
                      <Label>Thumbnail</Label>
                      <FileInput
                        fieldName="thumbnail"
                        maxSize={500000000}
                        setError={setThumbnailError}
                        setOnChange={setThumbnail}
                        supportedExtensions={["png", "jpg", "jpeg", "webp"]}
                        Icon={Icons.image}
                      />
                      <Label className="font-light text-rose-500">
                        {thumbnailError && thumbnailError}
                      </Label>
                    </FormItem>
                  </div>

                  <div className="col-span-2">
                    <FormItem>
                      <Label>Video</Label>
                      <FileInput
                        fieldName="video"
                        maxSize={5000000}
                        setOnChange={setVideo}
                        setError={setVideoError}
                        supportedExtensions={["mp4", "mpeg4", "wav"]}
                        Icon={Icons.video}
                      />
                      <Label className="font-light text-rose-500">
                        {videoError && videoError}
                      </Label>
                    </FormItem>
                  </div>

                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="col-span-5">
                          <Label>Description</Label>
                          <FormControl>
                            <Textarea
                              disabled={fetching}
                              placeholder="Short description of your content"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="font-light" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-fit p-2 border border-dashed rounded-lg">
                    <MediaPreview
                      className="h-auto rounded-sm"
                      file={thumbnail || initialData.thumbnail}
                    />
                  </div>
                  <div className="w-full p-2 border border-dashed rounded-lg">
                    <MediaPreview file={video || initialData.playBackUrl} />
                  </div>
                </div>

                <DialogFooter className="px-4">
                  <Button
                    disabled={posting}
                    className="min-w-fit w-full md:w-2/4"
                    type="submit"
                  >
                    {posting ? (
                      <SpinerLoading text="Publishing.." textHidden={false} />
                    ) : (
                      "Publish"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditVideo;
