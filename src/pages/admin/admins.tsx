/* eslint-disable @typescript-eslint/no-explicit-any */
import SpinerLoading from "@/components/spiner-loading";
import useAxios from "@/hooks/useAxios";
import { Heading } from "@/lib/utils/ui/heading";
import { useEffect, useState } from "react";
import { PlayerTable } from "../../components/admin/player-table";
import { Button } from "@/lib/utils/ui/button";
import { Separator } from "@/lib/utils/ui/separator";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import AddAdminDialog from "@/components/admin/add-admin";

export default function AllAdmin() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const { authAxios }: any = useAxios();

  useEffect(() => {
    actions.fetchAdmin();
  }, []);

  const actions = {
    fetchAdmin: async () => {
      try {
        const response = await authAxios.get("/user/admin");
        setAdmins(response.data.data);
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
            actions.fetchAdmin();
            return response.data.message;
          },
          error: (error) => {
            return error?.response?.data?.message || error.message;
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
            actions.fetchAdmin();
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
      <AddAdminDialog
        open={open}
        setOpen={setOpen}
        actions={actions}
        role="admin"
      />
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Admins - Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex justify-between items-center mb-3">
        <Heading title="All Admins" description="All admins are listed here" />
        <Button onClick={() => setOpen(true)}>Add Admin</Button>
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
