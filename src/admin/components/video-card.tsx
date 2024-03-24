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
import EditVideo from "./edit-video";
import { useVideo } from "@/hooks/useVideo";
import { DeleteDialog } from "../../components/delete-modal";
import { ConfirmDialog } from "../../components/confirm-modal";
import { FaCirclePlay } from "react-icons/fa6";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function DashboardVideoCard({ video }: any) {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmMdlOpen, setIsConfirmMdlOpen] = useState(false);
  const { makePublishHidden, deleteVideo }: any = useVideo();

  return (
    <Fragment key={video._id}>
      <EditVideo open={open} setOpen={setOpen} initialData={video} />
      <DeleteDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        action={() => deleteVideo(video._id)}
      />
      <ConfirmDialog
        title={`Are you want to ${
          video.isPublished ? "hide" : "publish"
        } the video?`}
        isOpen={isConfirmMdlOpen}
        setIsOpen={setIsConfirmMdlOpen}
        action={() => makePublishHidden(video._id)}
      />
      <ContextMenu key={video._id}>
        <ContextMenuTrigger>
          <article
            key={video._id}
            className={cn(
              "w-full max-w-fit rounded-xl overflow-hidden border",
              video.isPublished ? "bg-green-50" : "bg-rose-50"
            )}
          >
            <div className="max-w-full overflow-hidden bg-red-100">
              <ReactPlayer
                width="100%"
                height="100%"
                controls={true}
                url={video.playBackUrl}
                light={<img src={video.thumbnail} alt={video.title} />}
                playIcon={<FaCirclePlay />}
                previewTabIndex={4}
              />
            </div>
            <div className="p-3">
              <h1 className="text-xl font-semibold">{video.title}</h1>
              <p className="max-w-sm font-light text-sm py-1 truncate">
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
            onClick={() => setIsConfirmMdlOpen(true)}
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
            onClick={() => setIsOpen(true)}
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
