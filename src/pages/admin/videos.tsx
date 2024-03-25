/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/utils/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import DashboardVideoCard from "../../components/admin/video-card";
import PublishVideoDialog from "../../components/admin/add-video";
import SpinerLoading from "@/components/spiner-loading";
import { Fragment, useEffect, useState } from "react";
import { Separator } from "@/lib/utils/ui/separator";
import { Eye, EyeOff, Filter } from "lucide-react";
import { Heading } from "@/lib/utils/ui/heading";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { useVideo } from "@/hooks/useVideo";
import { Helmet } from "react-helmet";

export default function AllVideos() {
  const [search, setSearch] = useState("");
  const [sortedVideos, setSortedVideos] = useState([]);
  const { loading, videos, getDashboardVideo }: any = useVideo();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSortedVideos(getDashboardVideo());
  }, [getDashboardVideo, videos]);

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value.trim());
  };

  const handleStatusChange = (status: string) => {
    if (status === "all") {
      setSortedVideos(getDashboardVideo());
    } else if (status === "publish") {
      const filtered = getDashboardVideo().filter(
        (video: any) => video.isPublished === true
      );
      setSortedVideos(filtered);
    } else {
      const filtered = videos.filter(
        (video: any) => video.isPublished === false
      );
      setSortedVideos(filtered);
    }
  };

  useEffect(() => {
    const filteredVideos = getDashboardVideo().filter((video: any) => {
      return video.title.toLowerCase().includes(search.toLowerCase());
    });
    setSortedVideos(filteredVideos);
  }, [getDashboardVideo, search, videos]);

  return (
    <section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Videos - Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <PublishVideoDialog open={open} setOpen={setOpen} />
      <div className="flex justify-between gap-2 items-center">
        <Heading
          title="All Videos"
          description="These are videos in the database"
        />
        <Button onClick={() => setOpen(true)}>Upload Video</Button>
      </div>

      <Separator className="mt-4" />
      {loading ? (
        <div className="h-96 w-full flex justify-center">
          <SpinerLoading size={30} className="text-green-600" />
        </div>
      ) : (
        <Fragment>
          <div className="flex gap-2 bg-gray-50 py-4 px-2 justify-between mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-11 h-11 p-2 rounded-xl">
                  <Filter className="text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24">
                <DropdownMenuLabel className="p-1 font-medium">
                  Status
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="text-gray-600">
                  <DropdownMenuItem
                    className="gap-2 bg-blue-100 text-blue-600"
                    onClick={() => handleStatusChange("all")}
                  >
                    <Eye size={18} /> All
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 bg-green-100 text-green-600"
                    onClick={() => handleStatusChange("publish")}
                  >
                    <Eye size={18} /> Published
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 bg-gray-100"
                    onClick={() => handleStatusChange("hidden")}
                  >
                    <EyeOff size={18} /> Hidden
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              onChange={handleSearchChange}
              type="text"
              placeholder="Fitler by title"
              className="max-w-sm h-11 rounded-xl"
            />
          </div>
          {sortedVideos.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sortedVideos?.map((video: any) => (
                <DashboardVideoCard key={video._id} video={video} />
              ))}
            </div>
          ) : (
            <div className="max-w-full h-96 flex flex-col justify-center items-center gap-2">
              <svg
                width={150}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 72 90"
                x="0px"
                y="0px"
                fill="green"
              >
                <g data-name="Layer 25">
                  <path d="M57,54H8a3,3,0,0,1-3-3V18H42a1,1,0,0,0,0-2H5V13a3,3,0,0,1,3-3H60a3,3,0,0,1,3,3v3H60a1,1,0,1,0,0,2h3V28a1,1,0,0,0,2,0V13a5,5,0,0,0-5-5H8a5,5,0,0,0-5,5V51a5,5,0,0,0,5,5H57a1,1,0,0,0,0-2Z" />
                  <circle cx="9.01" cy="13" r="1" />
                  <circle cx="14.01" cy="13" r="1" />
                  <circle cx="19.01" cy="13" r="1" />
                  <path d="M57,17a1,1,0,0,0-1-1H46a1,1,0,0,0,0,2H56A1,1,0,0,0,57,17Z" />
                  <path d="M19.8,31.71a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l2.3-2.3,2.29,2.3a1,1,0,0,0,.71.29,1,1,0,0,0,.7-1.71L24.92,28l2.29-2.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-2.29,2.3-2.3-2.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L22.09,28,19.8,30.29A1,1,0,0,0,19.8,31.71Z" />
                  <path d="M40.8,31.71a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l2.3-2.3,2.29,2.3a1,1,0,0,0,.71.29,1,1,0,0,0,.7-1.71L45.92,28l2.29-2.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-2.29,2.3-2.3-2.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L43.09,28,40.8,30.29A1,1,0,0,0,40.8,31.71Z" />
                  <path d="M15.18,46.55a1,1,0,0,0,1.38.28,31.38,31.38,0,0,1,34.89,0A1,1,0,0,0,52,47a1,1,0,0,0,.55-1.83,33.34,33.34,0,0,0-37.11,0A1,1,0,0,0,15.18,46.55Z" />
                  <path d="M66.91,32.88a5,5,0,0,0-8.77,4.22L62,54.22A1,1,0,0,0,63,55a1,1,0,0,0,1-.78L67.87,37.1A5,5,0,0,0,66.91,32.88Zm-1,3.77L63,49.49,60.09,36.65a3,3,0,0,1,5.26-2.52A2.93,2.93,0,0,1,65.92,36.65Z" />
                  <path d="M63,56a4,4,0,1,0,4,4A4,4,0,0,0,63,56Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,63,62Z" />
                </g>
              </svg>
              <div className="text-center">
                <h1 className="text-xl text-green-600">No result</h1>
                <p className="font-light text-sm">
                  Please upload new video by clicking upload video button.
                </p>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </section>
  );
}
