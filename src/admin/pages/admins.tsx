/* eslint-disable @typescript-eslint/no-explicit-any */
import SpinerLoading from "@/components/spiner-loading";
import useAxios from "@/hooks/useAxios";
import { Heading } from "@/lib/utils/ui/heading";
import { useEffect, useState } from "react";
import { PlayerTable } from "../components/player-table";
import { Button } from "@/lib/utils/ui/button";
import { Separator } from "@/lib/utils/ui/separator";
import { Link } from "react-router-dom";

export default function AllAdmin() {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const { authAxios }: any = useAxios();

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const response = await authAxios.get("/user/admin");
        setAdmins(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdmin();
  }, [authAxios]);
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <Heading title="All Admins" description="All admins are listed here" />
        <Button asChild>
          <Link to="/dashboard/admin/add">Add Admin</Link>
        </Button>
      </div>
      <Separator />
      {loading ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <SpinerLoading size={30} className="text-green-500" />
        </div>
      ) : (
        <PlayerTable data={admins} />
      )}
    </section>
  );
}
