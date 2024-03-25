/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const VideoContext = createContext({});

export const VideoProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [practicedVideos, setPracticedVideos] = useState([]);
  const [ratedVideos, setRatedVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const { publicAxios, authAxios }: any = useAxios();
  const { auth }: any = useAuth();

  const addToPlaylist = async (videoId: string) => {
    toast.promise(
      authAxios.put("/user/playlist", {
        videoId,
      }),
      {
        loading: "Adding...",
        success: (response: any) => {
          setPlaylists(response.data.data.playlists);
          return response.data.message;
        },
        error: (error) => {
          return error.response.data.message || error.message;
        },
      }
    );
  };

  const removeToPlaylist = async (videoId: string) => {
    toast.promise(
      authAxios.delete("/user/playlist", {
        data: { videoId },
      }),
      {
        loading: "Removing...",
        success: (response: any) => {
          setPlaylists(response.data.data.playlists);
          return response.data.message;
        },
        error: (error) => {
          return error.response.data.message || error.message;
        },
      }
    );
  };

  const markAsPracticed = (videoId: string) => {
    toast.promise(
      authAxios.post("/video/practiced", {
        videoId: videoId,
      }),
      {
        loading: "Saving...",
        success: (response: any) => {
          fetchPracticeList();
          return response.data.message;
        },
        error: (error) => {
          return error.response.data.message;
        },
      }
    );
  };

  const isFavorite = (videoId: string) => {
    return playlists.some((item: any) => item._id.toString() === videoId);
  };

  const isRated = (videoId: string) => {
    return ratedVideos.some((item: any) => item.video.toString() === videoId);
  };

  const isPracticed = (videoId: string) => {
    return practicedVideos.some((item: any) => item === videoId);
  };

  const rateVideo = (videoId: string, rating: string) => {
    toast.promise(
      authAxios.post("/video/rate", {
        rating,
        videoId,
      }),
      {
        loading: "Writing...",
        success: (response: any) => {
          fetchRatedVideos();
          fetchVideos();
          return response.data.message;
        },
        error: (error) => {
          return error.response.data.message;
        },
      }
    );
  };

  const makePublishHidden = async (videoId: string) => {
    toast.promise(authAxios.put("/video/toggle", { videoId }), {
      loading: "Updating...",
      success: (response: any) => {
        fetchVideos();
        return response.data.message;
      },
      error: (error) => {
        console.log(error);
        return error.response.data.message;
      },
    });
  };

  const deleteVideo = async (videoId: string) => {
    toast.promise(authAxios.delete("/video", { data: { videoId } }), {
      loading: "Deleting...",
      success: (response: any) => {
        fetchVideos();
        return response.data.message;
      },
      error: (error) => {
        return error.response.data.error;
      },
    });
  };

  const getDashboardVideo = () => {
    if (auth.user.role.role === "coach") {
      return videos.filter(
        (item: any) => item.owner._id.toString() === auth.user._id
      );
    } else {
      return videos;
    }
  };

  const fetchPlaylists = useCallback(async () => {
    try {
      if (auth.isAuth && auth.user.role.role === "player") {
        const response = await authAxios.get("/user/playlist");
        setPlaylists(response.data.data.playlists);
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth, authAxios]);

  const fetchPracticeList = useCallback(async () => {
    try {
      const response = await authAxios.get("/user/practicelist");
      setPracticedVideos(response.data.data.practiceList);
    } catch (error) {
      console.log(error);
    }
  }, [authAxios]);

  const fetchRatedVideos = useCallback(async () => {
    try {
      const response = await authAxios.get("/user/rated-videos");
      setRatedVideos(response.data.data.videos);
    } catch (error) {
      console.log(error);
    }
  }, [authAxios]);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await publicAxios.get("/video");
      setVideos(response.data.data.videos);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }, [publicAxios]);

  useEffect(() => {
    async function init() {
      await fetchVideos();
      if (auth.isAuth) {
        await fetchPracticeList();
        await fetchRatedVideos();
        await fetchPlaylists();
      }
      setLoading(false);
    }

    init();
  }, [
    auth.isAuth,
    fetchPlaylists,
    fetchPracticeList,
    fetchRatedVideos,
    fetchVideos,
  ]);

  const contextValue = {
    loading,
    setLoading,
    videos,
    isFavorite,
    isRated,
    isPracticed,
    playlists,
    practicedVideos,
    ratedVideos,
    fetchVideos,
    addToPlaylist,
    removeToPlaylist,
    markAsPracticed,
    rateVideo,
    makePublishHidden,
    deleteVideo,
    getDashboardVideo,
  };

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};
