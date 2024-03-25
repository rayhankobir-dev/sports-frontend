/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlayerTable } from "../../components/admin/player-table";
import AddPlayerDialog from "@/components/admin/add-player";
import SpinerLoading from "@/components/spiner-loading";
import { Separator } from "@/lib/utils/ui/separator";
import { Heading } from "@/lib/utils/ui/heading";
import { Button } from "@/lib/utils/ui/button";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function AllCoach() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [coaches, setCoaches] = useState([]);
  const { authAxios }: any = useAxios();
  useEffect(() => {
    actions.fetchCoach();
  }, []);

  const actions = {
    fetchCoach: async () => {
      try {
        const response = await authAxios.get("/user/coach");
        setCoaches(response.data.data);
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
            actions.fetchCoach();
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
            actions.fetchCoach();
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
        title="Add New Coach"
        role="coach"
        open={open}
        setOpen={setOpen}
        actions={actions}
      />
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
        <Button onClick={() => setOpen(true)}>Add Coach</Button>
      </div>
      <Separator />
      {loading ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <SpinerLoading size={30} className="text-green-500" />
        </div>
      ) : (
        <PlayerTable data={coaches} actions={actions} />
      )}
    </section>
  );
}
