/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from "@/hooks/useAuth";
import { Card, CardContent, CardHeader } from "@/lib/utils/ui/card";
import { ClockIcon } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function HistoryCard() {
  const { auth }: any = useAuth();
  if (!auth.isAuth) return <Navigate to="/" />;
  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-6 h-6" />
            <h2 className="text-lg font-bold tracking-tighter">
              Watch History
            </h2>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-4">
          {auth?.user?.watchHistory?.map((item: any) => (
            <div key={item._id} className="flex items-center gap-4">
              <img
                alt="Thumbnail"
                className="aspect-video rounded-lg object-cover"
                height={90}
                src={item.thumbnail}
                width={160}
              />
              <div className="text-sm grid gap-1.5">
                <div className="font-medium line-clamp-2">{item.title}</div>
                <div className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
                  {item?.genre?.name}
                </div>
                <div className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
                  Duration: {item.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
