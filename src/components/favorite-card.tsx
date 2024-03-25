/* eslint-disable @typescript-eslint/no-explicit-any */
import { useVideo } from "@/hooks/useVideo";
import { Button } from "@/lib/utils/ui/button";
import Notfound from "@/assets/vector/mobile-browser.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/utils/ui/card";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

export default function Playlist() {
  const { loading, playlists, removeToPlaylist }: any = useVideo();
  return (
    <Card className=" flex-1 py-5">
      <CardContent>
        <CardTitle>Your Playlist</CardTitle>
        <CardDescription className="mt-2">
          These are video recent history.
        </CardDescription>
      </CardContent>
      {!loading && (
        <CardFooter className="w-fit flex flex-col justify-start items-start py-0 overflow-hidden gap-2">
          {!playlists.length ? (
            <div className="flex flex-col gap-3 justify-center">
              <img className="max-w-24" src={Notfound} />
              <h1 className="text-lg text-green-600">No Item Available</h1>
            </div>
          ) : (
            playlists.map((video: any) => (
              <Card key={video._id} className="w-full flex group">
                <CardHeader className="min-w-fit p-0">
                  <img className="w-48 rounded-sm" src={video?.thumbnail} />
                </CardHeader>

                <CardContent className="py-2 relative w-full">
                  <Button
                    onClick={() => removeToPlaylist(video._id)}
                    variant="destructive"
                    className="w-7 h-7 p-0 absolute top-2 right-2 opacity-0 group-hover:opacity-100 duration-500"
                  >
                    <Trash size={14} />
                  </Button>
                  <CardTitle className="max-w-lg">
                    <Link key={video?._id} to={`/videos/${video?.slug}`}>
                      {video?.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="max-h-6 max-w-md truncate overflow-hidden mt-1">
                    {video?.description}
                  </CardDescription>

                  <div></div>
                </CardContent>
              </Card>
            ))
          )}
        </CardFooter>
      )}
    </Card>
  );
}
