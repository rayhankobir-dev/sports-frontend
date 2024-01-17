import BreadCrumb from "../components/breadcrumb";
import { PlayerAddForm } from "../components/forms/player-form";
import DashboardLayout from "../layout/layout";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
function Dashboard() {
  return (
    <DashboardLayout>
      <main>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <PlayerAddForm
            categories={[
              { _id: "shirts", name: "shirts" },
              { _id: "pants", name: "pants" },
            ]}
            initialData={null}
            key={null}
          />
        </div>
      </main>
    </DashboardLayout>
  );
}

export default Dashboard;
