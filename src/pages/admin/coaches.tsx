/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading } from "@/lib/utils/ui/heading";
import { Separator } from "@/lib/utils/ui/separator";
import { PlayerTable } from "../../components/admin/player-table";
import { useEffect, useState } from "react";
import SpinerLoading from "@/components/spiner-loading";
import useAxios from "@/hooks/useAxios";
import { Button } from "@/lib/utils/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllCoach() {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const { authAxios }: any = useAxios();
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await authAxios.get("/user/coach");
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Coaches - Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex justify-between items-center mb-2">
        <Heading
          title="All Coaches"
          description="All players are listed here."
        />
        <Button asChild>
          <Link to="/dashboard/coach/add">Add Coach</Link>
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
