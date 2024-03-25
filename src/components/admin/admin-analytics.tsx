/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/lib/utils/ui/card";
import GeoChart from "@/components/charts/geo-chart";
import PieChart from "@/components/charts/pie-chart";
import { Fragment, useEffect, useState } from "react";
import SpinerLoading from "@/components/spiner-loading";
import useAxios from "@/hooks/useAxios";

import { Helmet } from "react-helmet";
import TopwatchedCard from "./topwatched-card";
export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics]: any = useState({});
  const { authAxios }: any = useAxios();

  useEffect(() => {
    async function fetAnalytics() {
      try {
        const response = await authAxios.get(`/admin/analytics`);
        setAnalytics(response.data.data.analytics);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetAnalytics();
  }, [authAxios]);
  return (
    <main className="flex flex-1 flex-col gap-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin - Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="font-semibold text-lg lg:text-2xl">Admin Dashboard</h1>
          <p className="text-sm font-light">
            While makeing Withdraw please check your payement method.
          </p>
        </div>
      </div>
      {loading ? (
        <div className="h-96 w-full flex justify-center items-center">
          <SpinerLoading size={30} className="text-green-600" />
        </div>
      ) : (
        <Fragment>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="py-2">
                <CardDescription className="text-gray-600">
                  All Contents
                </CardDescription>
                <CardTitle className="text-green-600">Total Video</CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold">
                  {analytics?.videoInfo?.totalVideos}
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200">
              <CardHeader className="py-2">
                <CardDescription className="text-gray-700">
                  Register players all time.
                </CardDescription>
                <CardTitle className="text-gray-600">Total Players</CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold">
                  {analytics?.userCount?.player?.count}
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-rose-50 border-rose-200">
              <CardHeader className="py-2">
                <CardDescription className="text-gray-700">
                  Rejected contents all time.
                </CardDescription>
                <CardTitle className="text-rose-600">Total Coaches</CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold">
                  {analytics?.userCount?.coach?.count}
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="py-2">
                <CardDescription className="text-gray-700">
                  Rejected contents all time.
                </CardDescription>
                <CardTitle className="text-blue-500">Total Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold">
                  {analytics?.userCount?.admin?.count}
                </CardTitle>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>Video Genre Wise</CardDescription>
                <CardTitle>Total Video</CardTitle>
              </CardHeader>
              <CardContent className="max-w-full h-96">
                <PieChart data={analytics.pieData} />
              </CardContent>
            </Card>

            <TopwatchedCard
              title="Top Watched Videos"
              subTitle="Mostly Watched Video"
              videos={analytics.topVideos}
            />
          </div>
          <Card className="mb-12">
            <CardHeader>
              <CardDescription>
                Geographical Players Distribution
              </CardDescription>
              <CardTitle>Top Countries Players</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-[450px]">
              <GeoChart data={analytics.geoData} />
            </CardContent>
          </Card>
        </Fragment>
      )}
    </main>
  );
}
