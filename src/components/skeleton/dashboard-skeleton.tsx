import { Skeleton } from "@/lib/utils/ui/skeleton";
import Logo from "@/assets/obeey-short.svg";
import SpinerLoading from "../spiner-loading";
import { Fragment } from "react";

export default function NavSkeleton() {
  return (
    <div className="px-12 py-3 flex justify-between items-center space-x-4 bg-gray-50 border-b z-10">
      <div className="flex items-center gap-3">
        <img src={Logo} className="h-8" />
        <h3 className="font-medium text-lg">Obeey</h3>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

export const SideBarSkeleton = () => {
  return (
    <div className="w-64 max-w-96 fixed top-14 left-0 h-full space-y-4 py-4 bg-gray-50 border-r">
      <div className="flex gap-2 items-center bg-gray-100 py-3 rounded-sm">
        <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48 rounded-md bg-gray-300" />
          <Skeleton className="h-2 w-48 rounded-md bg-gray-300" />
        </div>
      </div>
      <div className="flex gap-2 items-center bg-gray-100 py-3 rounded-sm">
        <Skeleton className="h-7 w-7 rounded-full bg-gray-200 px-5" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="flex gap-2 items-center bg-gray-100 py-3 rounded-sm">
        <Skeleton className="h-7 w-7 rounded-full bg-gray-200 px-5" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-md bg-gray-200" />
        </div>
      </div>

      <div className="flex gap-2 items-center bg-gray-100 py-3 rounded-sm">
        <Skeleton className="h-7 w-7 rounded-full bg-gray-200 px-5" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-md bg-gray-300" />
        </div>
      </div>
      <div className="flex gap-2 items-center bg-gray-100 py-3 rounded-sm">
        <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48 rounded-md bg-gray-300" />
          <Skeleton className="h-2 w-48 rounded-md bg-gray-300" />
        </div>
      </div>
      <div className="flex gap-2 items-center bg-gray-100 py-3 rounded-sm">
        <Skeleton className="h-7 w-7 rounded-full bg-gray-300 px-5" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-md bg-gray-300" />
        </div>
      </div>
      <div className="flex gap-2 items-center bg-gray-100 py-3 rounded-sm">
        <Skeleton className="h-7 w-7 rounded-full bg-gray-200 px-5" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-md bg-gray-200" />
        </div>
      </div>

      <div className="flex gap-2 items-center bg-gray-100 py-3 rounded-sm">
        <Skeleton className="h-7 w-7 rounded-full bg-gray-200 px-5" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-md bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <Fragment>
      <NavSkeleton />
      <div className="pt-14 flex flex-1 overflow-hidden">
        <div className="relative w-64 border-r hidden md:block">
          <SideBarSkeleton />
        </div>
        <main className="h-96 w-full flex-1 px-4 overflow-y-auto flex justify-center items-center">
          <SpinerLoading size={30} className="text-xl" />
        </main>
      </div>
    </Fragment>
  );
};
