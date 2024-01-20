import BreadCrumb from "../components/breadcrumb";
import DashboardLayout from "../layout/layout";

const breadcrumbItems = [{ title: "Video", link: "/dashboard/video/new" }];

function AddVideoPage() {
  return (
    <DashboardLayout>
      <main>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <h1>Add Video</h1>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default AddVideoPage;
