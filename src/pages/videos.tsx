import HomeLayout from "@/components/home-layout";
import VideoCard from "@/components/video-card";
import VideoThmb1 from "../assets/videos/video-1.png";

const videos = [
  {
    id: 1,
    thumbnail: VideoThmb1,
    title: "Football Drills For 4V1",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 2,
    thumbnail: VideoThmb1,
    title: "Football Drills For 4V1",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 3,
    thumbnail: VideoThmb1,
    title: "Football Drills For 4V1",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 4,
    thumbnail: VideoThmb1,
    title: "Football Drills For 4V1",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
];

const VideoPage = () => {
  return (
    <HomeLayout>
      <section className="py-10">
        <div className="space-y-2 py-4">
          <h2 className="text-3xl font-bold ">Recent Videos</h2>
          <p className="">
            Find what you're looking for from our extensive collection.
          </p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>
    </HomeLayout>
  );
};

export default VideoPage;
