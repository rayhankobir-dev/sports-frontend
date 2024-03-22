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
  DialogHeader,
  DialogTitle,
} from "@/lib/utils/ui/dialog";
import ReactPlayer from "react-player";

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
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [video, setVideo] = useState("");
  const [videoError, setVideoError] = useState("");
  const { authAxios }: any = useAxios();

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
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setPosting(false);
    }
  };

  function validateThumbnail(selectedImage: any): boolean {
    const maxSize = 5 * 1024 * 1024;
    if (!selectedImage) {
      setThumbnailError("Thumbnail is required");
      return false;
    } else if (selectedImage.size > maxSize) {
      setThumbnailError("Thumbnail exceeds maximum file size (5MB)");
      return false;
    } else {
      const allowedFormats = ["jpg", "jpeg", "png", "webp"];
      const fileNameParts = selectedImage.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        setThumbnailError(
          "Thumbnail format is not supported(jpg,jpeg,png,webp)"
        );
        return false;
      }
      setThumbnailError("");
      return true;
    }
  }

  function validateVideo(video: any): boolean {
    const maxSize = 50 * 1024 * 1024;
    if (!video) {
      setVideoError("Video is required");
      return false;
    } else if (video.size > maxSize) {
      setVideoError("Video exceeds maximum file size (50MB)");
      return false;
    } else {
      const allowedFormats = ["mp4", "wav", "mpeg4"];
      const fileNameParts = video.name.split(".");
      const fileExtension =
        fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        setVideoError("Video format is not supported(mpeg4,wav,mp4)");
        return false;
      } else {
        setVideoError("");
        return true;
      }
    }
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setThumbnail(file);
    validateThumbnail(file);
  };

  const handleVideoChange = (event: any) => {
    const file = event.target.files[0];
    setVideo(file);
    validateVideo(file);
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit video</DialogTitle>
          <DialogDescription>
            Make changes to your video here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {fetching ? (
          <div className="h-24 w-full flex justify-center items-center">
            <SpinerLoading size={22} className="text-green-500" />
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
                  <div className="col-span-1">
                    <FormItem>
                      <Label>Thumbnail</Label>
                      <Input
                        name="thumbnail"
                        type="file"
                        className="cols-span-1 h-12 rounded-xl"
                        onChange={handleImageChange}
                        placeholder="Upload your content thumbnail"
                      />
                      <Label className="font-light text-rose-500">
                        {thumbnailError && thumbnailError}
                      </Label>
                    </FormItem>
                  </div>
                  <div className="col-span-1">
                    <FormItem>
                      <Label>Video</Label>
                      <Input
                        className="cols-span-1 h-12 rounded-xl"
                        name="file"
                        type="file"
                        onChange={handleVideoChange}
                        placeholder="Upload your content video"
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
                    <img
                      className=" h-auto rounded-sm"
                      src={thumbnail || initialData.thumbnail}
                    />
                  </div>
                  <div className="w-full p-2 border border-dashed rounded-lg">
                    <ReactPlayer
                      width="100%"
                      height="auto"
                      url={video || initialData.playBackUrl}
                    />
                  </div>
                </div>

                <Button
                  disabled={posting}
                  className="ml-auto min-w-fit w-1/4"
                  type="submit"
                >
                  {posting ? (
                    <SpinerLoading text="Publishing.." textHidden={false} />
                  ) : (
                    "Save Changes"
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

export default EditVideo;
