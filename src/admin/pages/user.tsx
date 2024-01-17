import { z } from "zod";
import { taskSchema } from "../data/schema";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { useState, useEffect } from "react";
import { Heading } from "@/lib/utils/ui/heading";
import { Button } from "@/lib/utils/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

function TaskPage(): JSX.Element {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:5173/tasks.json");
        const data = await response.json(); // Parse JSON from response body
        const parsedTasks = z.array(taskSchema).parse(data);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users`}
          description="Manage users (Client side table functionalities.)"
        />
        <Button className="text-xs md:text-sm" onClick={() => {}}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {isLoading ? (
        <div className="p-8">Loading tasks...</div>
      ) : (
        <div className="h-full flex-1 flex-col space-y-8 md:flex">
          <DataTable data={tasks} columns={columns} />
        </div>
      )}
    </>
  );
}

export default TaskPage;
