/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/lib/utils/ui/heading";
import { Separator } from "@/lib/utils/ui/separator";
import { PlayerTable } from "../components/player-table";
import { useEffect, useState } from "react";
import SpinerLoading from "@/components/spiner-loading";
import useAxios from "@/hooks/useAxios";
import { Button } from "@/lib/utils/ui/button";
import { Link } from "react-router-dom";

export default function AllPlayers() {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const { authAxios }: any = useAxios();
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await authAxios.get("/user/player");
        setPlayers(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, [authAxios]);

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <Heading
          title="All Players"
          description="All players are listed here."
        />
        <Button asChild>
          <Link to="/dashboard/player/add">Add Player</Link>
        </Button>
      </div>
      <Separator />
      {loading ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <SpinerLoading size={30} className="text-green-500" />
        </div>
      ) : (
        <PlayerTable data={players} />
      )}
    </section>
  );
}
