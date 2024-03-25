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
import TopWatchedCard from "./topwatched-card";

export default function CoachAnalytics() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics]: any = useState({});
  const { authAxios }: any = useAxios();

  useEffect(() => {
    async function fetAnalytics() {
      try {
        const response = await authAxios.get("/coach/analytics");
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
        <title>Coach - Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="font-semibold text-lg lg:text-2xl">Coach Dashboard</h1>
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
                <CardTitle className="text-gray-600">
                  Total Players Watched
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold">
                  {analytics?.watchedUser}
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-rose-50 border-rose-200">
              <CardHeader className="py-2">
                <CardDescription className="text-gray-700">
                  Total uploaded contents categories.
                </CardDescription>
                <CardTitle className="text-rose-600">
                  Total Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold">
                  {analytics.genreCount}
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="py-2">
                <CardDescription className="text-gray-700">
                  Total Watched Time
                </CardDescription>
                <CardTitle className="text-blue-500">
                  Total Watched Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold">
                  {Number(analytics.watchTime).toFixed(2)} Hours
                </CardTitle>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="max-w-full w-full overflow-hidden flex flex-col">
              <CardHeader>
                <CardDescription>Video Genre Wise</CardDescription>
                <CardTitle>Total Video</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-96 ">
                <PieChart data={analytics.pieData} />
              </CardContent>
            </Card>

            <TopWatchedCard
              title="Top Watched Videos"
              subTitle="Your Mostly Watched Video"
              videos={analytics.topVideos}
            />
          </div>
          <Card className="mb-12">
            <CardHeader>
              <CardDescription>Geographical Watched Player</CardDescription>
              <CardTitle>Top Countries</CardTitle>
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
