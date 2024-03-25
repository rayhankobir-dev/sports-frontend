/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/lib/utils/ui/card";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function HistoryCard() {
  const { auth }: any = useAuth();
  return (
    <Card className="flex-1 py-5">
      <CardContent>
        <CardTitle>Watch History</CardTitle>
        <CardDescription className="mt-2">
          These are video recent history.
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col py-0 overflow-hidden gap-2">
        {auth.user?.watchHistory?.map((video: any, index: number) => (
          <Link
            key={index}
            to={`/videos/${video?.slug}`}
            className="w-full flex gap-3 bg-gray-50 rounded-md p-1"
          >
            <img className="w-14 rounded-sm" src={video?.thumbnail} />
            <div>
              <h3>{video?.title}</h3>
              <p>{video?.dutation}</p>
            </div>
          </Link>
        ))}
      </CardFooter>
    </Card>
  );
}
