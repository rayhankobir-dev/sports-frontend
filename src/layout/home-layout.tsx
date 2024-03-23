import FooterSection from "@/layout/footer";
import HeaderSection from "@/layout/header";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <>
      <HeaderSection />
      <main className="min-h-[65vh] px-4 md:container lg:max-w-7xl mx-auto">
        <Outlet />
      </main>
      <FooterSection />
    </>
  );
}

export default HomeLayout;
