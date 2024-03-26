/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/lib/utils/ui/card";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
export default function TopWatchedCard({ title, subTitle, videos }: any) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardDescription>{subTitle}</CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <ScrollArea className="w-full h-full md:h-96">
        <CardContent>
          {videos.map((video: any) => (
            <Card key={video._id} className="flex justify-between gap-1 mb-2">
              <CardHeader className="w-1/3 p-2">
                <img src={video.thumbnail} className="rounded-sm" />
              </CardHeader>
              <CardContent className="w-2/3 flex flex-col p-2">
                <CardTitle className="w-full h-7 overflow-hidden text-md md:text-xl">
                  <Link to={`/videos/${video?.slug}`}>{video.title}</Link>
                </CardTitle>
                <CardDescription className="w-full h-8 overflow-hidden text-xs font-light">
                  {video.description}
                </CardDescription>
                <CardDescription className="flex items-center gap-4 mt-1 text-gray-500 text-xs md:textsm">
                  <span>Genre: {video.genreName}</span>
                  <span className="min-w-fit flex gap-1 items-center">
                    <Eye size={18} /> {video.views}
                  </span>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
