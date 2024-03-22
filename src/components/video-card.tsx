/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/lib/utils/ui/card";
import Rating from "./rating";
import { Heart } from "lucide-react";

function VideoCard({ video }: any) {
  return (
    <Card className="relative group border rounded-md overflow-hidden">
      <Link to={`/videos/${video.slug}`}>
        <img
          className="object-contain w-full group-hover:opacity-80 transition-opacity"
          src={video.thumbnail}
        />
      </Link>
      <CardContent className="relative p-3">
        <button className="p-2 rounded-md absolute -top-5 right-3 hover:bg-green-500 bg-green-600 text-white group-hover:opacity-100">
          <Heart />
        </button>
        <Link to={`/videos/${video.slug}`}>
          <h2 className="font-semibold tracking-tight text-xl">
            {video.title}
          </h2>
        </Link>
        <small className="text-sm leading-none text-gray-500 dark:text-gray-400">
          Category: {video.genre.name}
        </small>
        <p className="text-light text-sm truncate pt-3">{video.description}</p>
      </CardContent>
      <CardFooter className="px-3">
        <Rating rating={Number(video.averageRating)} size={12} />
      </CardFooter>
    </Card>
  );
}

export default VideoCard;
