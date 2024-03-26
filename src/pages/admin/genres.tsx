/* eslint-disable @typescript-eslint/no-explicit-any */
import SpinerLoading from "@/components/spiner-loading";
import { Separator } from "@/lib/utils/ui/separator";
import { Heading } from "@/lib/utils/ui/heading";
import { Button } from "@/lib/utils/ui/button";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import CreateGenre from "@/components/admin/add-genre";
import { GenreTable } from "@/components/admin/genre-table";

export default function AllGenres() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const { authAxios }: any = useAxios();
  useEffect(() => {
    actions.fetchGenre();
  }, []);

  const actions = {
    fetchGenre: async () => {
      try {
        const response = await authAxios.get("/genre");
        setGenres(response.data.data.genres);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    deleteGenre: async (genreId: string) => {
      toast.promise(
        authAxios.delete("/genre", {
          data: {
            genreId,
          },
        }),
        {
          loading: "Deleting...",
          success: (response: any) => {
            actions.fetchGenre();
            return response.data.message;
          },
          error: (error) => {
            return error?.response?.data?.message;
          },
        }
      );
    },
    createGenre: async (name: string) => {
      toast.promise(
        authAxios.post("/genre", {
          name,
        }),
        {
          loading: "Creating",
          success: (response: any) => {
            actions.fetchGenre();
            return response.data.message;
          },
          error: (error) => {
            return error?.response?.data?.message || error.message;
          },
        }
      );
    },
  };

  return (
    <section>
      <CreateGenre open={open} setOpen={setOpen} actions={actions} />
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Genres - Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex justify-between items-center mb-2">
        <Heading title="All Genres" description="All Genres are listed here." />
        <Button onClick={() => setOpen(true)}>New Genre</Button>
      </div>
      <Separator />
      {loading ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <SpinerLoading size={30} className="text-green-500" />
        </div>
      ) : (
        <GenreTable data={genres} actions={actions} />
      )}
    </section>
  );
}
