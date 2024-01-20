import BreadCrumb from "../components/breadcrumb";
import { VideoAddForm } from "../components/forms/video-form";
import DashboardLayout from "../layout/layout";

const breadcrumbItems = [{ title: "Video", link: "/dashboard/video/new" }];

function AddVideoPage() {
  return (
    <DashboardLayout>
      <main>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <VideoAddForm initialData="" />
        </div>
      </main>
    </DashboardLayout>
  );
}

export default AddVideoPage;
