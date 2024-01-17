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
            genders={[
              { _id: "male", name: "Male" },
              { _id: "female", name: "Female" },
            ]}
            genres={[
              { _id: "midfilder", name: "Midfilder" },
              { _id: "goalkeeper", name: "Goalkeeper" },
              { _id: "defense", name: "Defense" },
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
