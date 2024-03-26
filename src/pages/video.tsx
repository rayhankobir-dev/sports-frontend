/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/utils/ui/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/utils/ui/popover";
import { Fragment, useCallback, useEffect, useState } from "react";
import SpinerLoading from "@/components/spiner-loading";
import NotFound from "@/assets/vector/not-found.svg";
import RatingInput from "@/components/rating-input";
import { Link, useParams } from "react-router-dom";
import SectionBg from "@/assets/section-bg.jpeg";
import VideoCard from "@/components/video-card";
import { Button } from "@/lib/utils/ui/button";
import { LuBadgeCheck } from "react-icons/lu";
import useAxios from "@/hooks/useAxios";
import ReactPlayer from "react-player";
import useAuth from "@/hooks/useAuth";
import { useVideo } from "@/hooks/useVideo";

export default function SingleVideoPage() {
  const [loading, setLoading] = useState(true);
  const [video, setVideo]: any = useState({});
  const [relatedVideos, setRelatedVideos]: any = useState({});
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);
  const { publicAxios, authAxios }: any = useAxios();
  const { auth }: any = useAuth();
  const { slug } = useParams();
  const { isPracticed, isRated, markAsPracticed, rateVideo }: any = useVideo();

  const onRatingChange = (value: number) => {
    setRating(value);
  };

  const handleRatingSubmit = async () => {
    rateVideo(video._id, rating);
  };

  const fetchVideo = useCallback(async () => {
    try {
      const response = await publicAxios.get(`/video/${slug}`);
      const { video, relatedVideos } = response.data.data;
      setVideo(video);
      setRelatedVideos(relatedVideos);

      setError(null);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  }, [slug, publicAxios]);

  const updateWatchHistory = useCallback(async () => {
    try {
      if (auth.isAuth && !loading) {
        await authAxios.put("/video/watch-history", {
          videoId: video._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth, authAxios, loading, video._id]);

  useEffect(() => {
    fetchVideo();
    setTimeout(updateWatchHistory, 5000);
  }, [slug, fetchVideo, auth.isAuth, updateWatchHistory]);

  return (
    <Fragment>
      {loading ? (
        <div className="w-full h-60 flex justify-center items-center">
          <SpinerLoading size={30} className="text-green-600" />
        </div>
      ) : error ? (
        <div className="flex flex-col gap-3 items-center py-10">
          <img className="h-96 w-96 mx-auto" src={NotFound} />
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      ) : (
        <Fragment>
          <section className="h-[15rem] relative bg-green-100 rounded-b-lg overflow-hidden">
            <img src={SectionBg} className="w-full h-full absolute top-0" />
            <div className="relative h-full w-full px-4 pt-10 pl-10 bg-opacity-45 bg-black">
              <p className="text-white py-2">Category: {video.genre.name}</p>
              <h1 className="relative font-bold text-2xl lg:text-4xl text-white uppercase">
                {video?.title}
              </h1>
            </div>
          </section>
          <section>
            <div className="grid lg:grid-cols-2">
              <div className="w-[95%] mx-auto lg:w-full rounded-xl overflow-hidden -translate-y-20 lg:translate-x-10">
                <ReactPlayer
                  width="100%"
                  height="auto"
                  controls={true}
                  url={video.playBackUrl}
                />
              </div>
              <div className="flex flex-col md:pl-10 -translate-y-16 lg:translate-y-0 lg:pl-24 py-5 space-y-4">
                <div>
                  <h1 className="font-bold text-2xl">Overall Rating: </h1>
                  <p className="font-light pt-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Architecto praesentium id et illum quia corrupti modi? Culpa
                    tempora, quo voluptate modi ea.
                  </p>
                </div>
                <div className="pt-4">
                  {auth.isAuth && (
                    <Fragment>
                      {isPracticed(video._id) ? (
                        <div className="w-full inline-flex item-center justify-between text-green-600">
                          <div className="inline-flex gap-2 items-center">
                            <LuBadgeCheck size={24} />
                            <p>You already practiced</p>
                          </div>
                          {!isRated(video._id) && (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-10 max-h-fit hover:bg-green-600 hover:text-white"
                                >
                                  Rate Video
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                  <div className="space-y-2">
                                    <h4 className="font-medium leading-none">
                                      Please Share your Experience
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      Drage and set the experience satisfy
                                      level.
                                    </p>
                                  </div>
                                  <div className="grid gap-2">
                                    <RatingInput
                                      initialRating={rating}
                                      onRatingChange={onRatingChange}
                                    />
                                    <Button
                                      onClick={handleRatingSubmit}
                                      className="bg-green-600"
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      ) : (
                        <Button
                          onClick={() => markAsPracticed(video._id)}
                          className="w-fit bg-green-600"
                        >
                          Practiced
                        </Button>
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:pl-10 -translate-y-10">
              <h1 className="font-medium text-2xl">Description:</h1>
              <p className="py-2 font-light">{video.description}</p>
            </div>
          </section>
          <section className="lg:pl-10 pb-16">
            <h1 className="font-bold text-2xl">Related Videos:</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex esse
              error dolor.
            </p>

            {relatedVideos.length > 0 ? (
              <div className="px-10">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full mt-5"
                >
                  <CarouselContent>
                    {relatedVideos.map((video: any) => (
                      <CarouselItem
                        key={video._id}
                        className="md:basis-1/3 lg:basis-1/4"
                      >
                        <div className="p-1">
                          <VideoCard video={video} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : (
              <h1 className="font-semibold py-10 text-green-600">
                No related videos
              </h1>
            )}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
