import BreadCrumb from "../components/breadcrumb";
import { CoachAddForm } from "../components/forms/coach-form";
import DashboardLayout from "../layout/layout";

const breadcrumbItems = [{ title: "Player", link: "/dashboard/player/create" }];

function AddCoachPage() {
  return (
    <DashboardLayout>
      <main>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <CoachAddForm
            genders={[
              { _id: "male", name: "Male" },
              { _id: "female", name: "Female" },
            ]}
            initialData={null}
            key={null}
          />
        </div>
      </main>
    </DashboardLayout>
  );
}

export default AddCoachPage;
