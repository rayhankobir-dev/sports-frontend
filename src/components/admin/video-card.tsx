import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/lib/utils/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/lib/utils/ui/avatar";
import { Eye, EyeOff, MoreHorizontal, PenBox, Trash } from "lucide-react";
import { cn, getAvatarFallbackLetter } from "@/lib/utils";
import { ConfirmDialog } from "../confirm-modal";
import { FaCirclePlay } from "react-icons/fa6";
import { DeleteDialog } from "../delete-modal";
import { Button } from "@/lib/utils/ui/button";
import { useVideo } from "@/hooks/useVideo";
import { Fragment, useState } from "react";
import ReactPlayer from "react-player";
import EditVideo from "./edit-video";

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
        <div className="p-3 w-full overflow-hidden">
          <h1 className="text-xl font-semibold">{video.title}</h1>
          <p className="font-light text-sm py-1 max-h-10 overflow-hidden">
            {video.description}
          </p>
          <div className="mt-4 flex justify-between items-center gap-2">
            <div className="inline-flex items-center gap-2">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-10 h-8 p-1">
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
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
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setOpen(true)}
                    className="text-blue-600 gap-2"
                  >
                    <PenBox size={16} />
                    Edit
                    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsOpen(true)}
                    className="text-rose-600 gap-2"
                  >
                    <Trash size={16} />
                    Delete
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </article>
    </Fragment>
  );
}
