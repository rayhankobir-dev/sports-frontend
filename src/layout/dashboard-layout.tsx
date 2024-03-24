import { Fragment } from "react";
import Navbar from "@/layout/navbar";
import { Sidebar } from "@/layout/sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Fragment>
        <Navbar />
        <div className="pt-14 flex flex-1 overflow-hidden">
          <Sidebar className="relative w-64 border-r hidden md:block" />
          <main className="flex-1 pt-6 px-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </Fragment>
    </div>
  );
}

export default DashboardLayout;
