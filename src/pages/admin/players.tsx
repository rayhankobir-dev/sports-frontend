/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/lib/utils/ui/heading";
import { Separator } from "@/lib/utils/ui/separator";
import { PlayerTable } from "../../components/admin/player-table";
import { useEffect, useState } from "react";
import SpinerLoading from "@/components/spiner-loading";
import useAxios from "@/hooks/useAxios";
import { Button } from "@/lib/utils/ui/button";
import { Helmet } from "react-helmet";
import AddPlayerDialog from "../../components/admin/add-player";
import toast from "react-hot-toast";

export default function AllPlayers() {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [open, setOpen] = useState(false);
  const { authAxios }: any = useAxios();
  useEffect(() => {
    actions.fetchPlayer();
  }, []);

  const actions = {
    fetchPlayer: async () => {
      try {
        const response = await authAxios.get("/user/player");
        setPlayers(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    deleteUser: async (id: string) => {
      toast.promise(
        authAxios.delete("/user", {
          data: {
            user: id,
          },
        }),
        {
          loading: "Deleting...",
          success: (response: any) => {
            actions.fetchPlayer();
            return response.data.message;
          },
          error: (error) => {
            return error.response.data.message;
          },
        }
      );
    },
    createUser: async (formData: any) => {
      toast.promise(
        authAxios.post("/user/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Creating",
          success: (response: any) => {
            actions.fetchPlayer();
            return response.data.message;
          },
          error: (error) => {
            return error.response.data.message || error.message;
          },
        }
      );
    },
  };

  return (
    <section>
      <AddPlayerDialog
        open={open}
        setOpen={setOpen}
        actions={actions}
        role="player"
        title="Create New Player"
      />
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Players - Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex justify-between items-center mb-2">
        <Heading
          title="All Players"
          description="All players are listed here."
        />
        <Button onClick={() => setOpen(true)}>Add Player</Button>
      </div>
      <Separator />
      {loading ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <SpinerLoading size={30} className="text-green-500" />
        </div>
      ) : (
        <PlayerTable data={players} actions={actions} />
      )}
    </section>
  );
}
