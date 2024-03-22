/* eslint-disable @typescript-eslint/no-explicit-any */
import VideoCard from "@/components/video-card";
import SpinerLoading from "@/components/spiner-loading";
import { useVideo } from "@/hooks/useVideo";
import MissedChance from "@/assets/vector/missed-chance.svg";

const VideoPage = () => {
  const { loading, videos }: any = useVideo();

  return (
    <section className="py-10">
      <div className="space-y-2 py-4">
        <h2 className="text-3xl font-bold ">Recent Videos</h2>
        <p className="">
          Find what you're looking for from our extensive collection.
        </p>
      </div>
      {loading ? (
        <SpinerLoading />
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
          {videos.filter((item: any) => item.isPublished).length ? (
            videos
              .filter((item: any) => item.isPublished)
              .map((video: any) => <VideoCard video={video} key={video._id} />)
          ) : (
            <div className="col-span-4 py-10 border-dashed border rounded-xl bg-gray-50">
              <img className="w-48 mx-auto" src={MissedChance} />
              <h1 className="text-center font-semibold text-xl text-green-600">
                Video Not Avialable
              </h1>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default VideoPage;
