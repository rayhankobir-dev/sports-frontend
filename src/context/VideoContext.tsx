/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { createContext, useEffect, useState } from "react";

export const VideoContext = createContext({});

export const VideoProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [practicedVideos, setPracticedVideos] = useState([]);
  const [ratedVideos, setRatedVideos] = useState([]);
  const { publicAxios }: any = useAxios();
  const { auth }: any = useAuth();

  const addVideoToPlaylist = (videoId: string, playlistId: string) => {
    console.log(videoId, playlistId);
  };

  const markAsPracticed = (videoId: string) => {
    console.log(auth);
    console.log(videoId);
    setRatedVideos([]);
    setPlaylists([]);
    setPlaylists([]);
    setPracticedVideos([]);
  };

  const rateVideo = (videoId: string, rating: string) => {
    console.log(videoId, rating);

    // Rate video logic
  };

  const fetchVideos = async () => {
    try {
      const response = await publicAxios.get("/video");
      setVideos(response.data.data.videos);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const contextValue = {
    loading,
    setLoading,
    videos,
    playlists,
    practicedVideos,
    ratedVideos,
    addVideoToPlaylist,
    markAsPracticed,
    rateVideo,
  };

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};
