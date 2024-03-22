import { cn, getAvatarFallbackLetter } from "@/lib/utils";
import { ContextMenuShortcut } from "@/lib/utils/ui/context-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/lib/utils/ui/avatar";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/lib/utils/ui/context-menu";
import { Eye, EyeOff, PenBox, Trash } from "lucide-react";
import { Fragment, useState } from "react";
import ReactPlayer from "react-player";
import EditVideo from "../pages/edit-video";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function DashboardVideoCard({ video }: any) {
  const [open, setOpen] = useState(false);
  const { authAxios }: any = useAxios();

  const makePublishHidden = async (videoId: string) => {
    toast.promise(authAxios.put("/video/toggle", { videoId }), {
      loading: "Updating...",
      success: (response: any) => {
        return response.data.message;
      },
      error: (error) => {
        console.log(error);
        return error.response.data.message;
      },
    });
  };

  const deleteVideo = async (videoId: string) => {
    toast.promise(authAxios.delete("/video", { data: { videoId } }), {
      loading: "Deleting...",
      success: (response: any) => {
        return response.data.message;
      },
      error: (error) => {
        return error.response.data.error;
      },
    });
  };

  return (
    <Fragment key={video._id}>
      <EditVideo open={open} setOpen={setOpen} initialData={video} />
      <ContextMenu key={video._id}>
        <ContextMenuTrigger>
          <article
            key={video._id}
            className={cn(
              "rounded-xl overflow-hidden border",
              video.isPublished ? "bg-green-50" : "bg-rose-50"
            )}
          >
            <div className="w-full overflow-hidden">
              <ReactPlayer
                width="100%"
                height="auto"
                controls={true}
                url={video.playBackUrl}
              />
            </div>
            <div className="p-3">
              <h1 className="text-xl font-semibold">{video.title}</h1>
              <p className="font-light text-sm py-1 truncate">
                {video.description}
              </p>
              <div className="mt-3 inline-flex items-center gap-2">
                <Avatar
                  className={cn(
                    "w-8 h-8 bg-green-200 inline-flex justify-center items-center",
                    video.isPublished ? "bg-green-200" : "bg-rose-200"
                  )}
                >
                  <AvatarImage src={video.owner.avatar} />
                  <AvatarFallback>
                    {getAvatarFallbackLetter(video.owner.fullName)}
                  </AvatarFallback>
                </Avatar>
                <h2>{video.owner.fullName}</h2>
              </div>
            </div>
          </article>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem
            inset
            className="gap-2"
            onClick={() => makePublishHidden(video._id)}
          >
            {!video.isPublished ? (
              <Fragment>
                <Eye size={16} />
                Publish
              </Fragment>
            ) : (
              <Fragment>
                <EyeOff size={16} />
                Hidden
              </Fragment>
            )}
            <ContextMenuShortcut>⌘P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            inset
            className="gap-2"
            onClick={() => setOpen(true)}
          >
            <PenBox size={16} />
            Edit
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            inset
            className="text-rose-500 gap-2"
            onClick={() => deleteVideo(video._id)}
          >
            <Trash size={16} />
            Delete
            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Fragment>
  );
}
