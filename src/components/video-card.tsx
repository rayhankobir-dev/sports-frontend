import { Link } from "react-router-dom";
import { Card, CardContent } from "@/lib/utils/ui/card";

interface VideoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thumbnail: any;
  title: string;
  description: string;
}

function VideoCard({ thumbnail, title, description }: VideoProps) {
  return (
    <Card className="relative group border rounded-md overflow-hidden">
      <Link to="">
        <img
          alt="Product 3"
          className="object-contain w-full group-hover:opacity-80 transition-opacity"
          src={thumbnail}
        />
        <CardContent className="p-3">
          <h2 className="font-semibold tracking-tight text-xl">{title}</h2>
          <small className="text-sm leading-none text-gray-500 dark:text-gray-400">
            Category: Drills
          </small>
          <p className="text-light text-sm truncate pt-3">{description}</p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default VideoCard;
