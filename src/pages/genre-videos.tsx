/* eslint-disable @typescript-eslint/no-explicit-any */
import MissedChance from "@/assets/vector/missed-chance.svg";
import SpinerLoading from "@/components/spiner-loading";
import VideoCard from "@/components/video-card";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useVideo } from "@/hooks/useVideo";
import { Helmet } from "react-helmet";
import { capitalize } from "@/lib/utils";

const GenreVideoPage = () => {
  const [genreVideos, setGenreVideos] = useState([]);
  const { loading, videos }: any = useVideo();
  const { slug } = useParams();

  useEffect(() => {
    const publishedVideos = videos.filter((item: any) => item.isPublished);
    const genreVideos = publishedVideos.filter(
      (item: any) => item.genre.slug === slug
    );

    setGenreVideos(genreVideos);
  }, [videos, slug]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {capitalize(String(slug))} Drills - Football Drills Platform
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section className="pt-5 pb-10">
        <div className="space-y-2 py-4">
          <h2 className="text-3xl font-bold capitalize">{slug} Drills</h2>
          <p className="">
            Find what you're looking for from our extensive collection.
          </p>
        </div>
        {loading ? (
          <div className="h-96 w-full flex justify-center items-center">
            <SpinerLoading size={25} className="text-green-600" />
          </div>
        ) : genreVideos.length > 0 ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
            {genreVideos.map((video: any) => (
              <VideoCard video={video} key={video._id} />
            ))}
          </div>
        ) : (
          <div className="py-10 border-dashed border rounded-xl bg-gray-50">
            <img className="w-48 mx-auto" src={MissedChance} />
            <h1 className="text-center font-semibold text-xl text-green-600">
              Video Not Avialable
            </h1>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default GenreVideoPage;
