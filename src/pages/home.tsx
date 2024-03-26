import MissedChanceGif from "../assets/missed-chances.gif";
import HomeOutline1 from "../assets/home-1.png";
import HomeOutline2 from "../assets/home-2.png";
import HomeOutline3 from "../assets/home-2.png";
import { Button } from "@/lib/utils/ui/button";
import { CheckCircleIcon } from "lucide-react";
import { Badge } from "@/lib/utils/ui/badge";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Fragment } from "react";

const clipPath =
  "clipPath: polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)";
const clipPath2 =
  "clipPath: polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)";

function HomePage() {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sports - Football Drills Platform</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <section className="relative isolate px-6 lg:px-8 pt-10 md:pt-0">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[80deg] bg-gradient-to-tr from-[#16a34a] to-[#4affcf] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ clipPath: clipPath }}
          ></div>
        </div>
        <div className="mx-auto max-w-fit pb-20 sm:py-16 lg:py-20">
          <div className="mb-8 sm:flex sm:justify-center">
            <div className="max-w-fit mx-auto relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our Upcomming videos.
              <span className="font-semibold text-green-600">
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="max-w-3xl mx-auto text-4xl font-bold tracking-tight text-green-700 sm:text-6xl">
              Watch your preferable Videos. Get Skill from our coach.
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-lg bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                to="/"
                className="rounded-lg border border-green-600 hover:bg-green-500 hover:text-white duration-100 px-3.5 py-2.5 text-sm font-semibold text-green-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#16a34a] to-[#0ef061] opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{ clipPath: clipPath2 }}
          ></div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 items-center">
        <img src={MissedChanceGif} alt="" />
        <div className="overflow-hidden">
          <h1 className="font-bold text-5xl text-green-600">
            Need inspiration for your sessions?
          </h1>
          <p className="mt-10 md:mr-5 font-medium">
            Never be short of ideas with our ever growing collection of Football
            drills. With pro drills and the community section, the inspiration
            is constantly growing.
          </p>
          <ul className="flex flex-col gap-y-5 font-light mt-5">
            <li className="inline-flex items-center gap-4">
              <CheckCircleIcon className="text-green-600 w-8" />
              Browse Football drills by category or use the search bar to
              quickly find what you're looking for.
            </li>
            <li className="inline-flex items-center gap-4">
              <CheckCircleIcon className="text-green-600 w-8" />
              Over 500+ football training games and drills Constant stream of
              community football drills and trends
            </li>
            <li className="inline-flex items-center gap-4">
              <CheckCircleIcon className="text-green-600 w-8" />
              Favourite the football drills you like to save them and find them
              more easily later
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            src={HomeOutline1}
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Inspiration
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Need inspiration for your sessions?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Never be short of ideas with our ever growing collection of
                Football drills. With pro drills and the community section, the
                inspiration is constantly growing. Browse Football drills by
                category or use the search bar to quickly find what you're
                looking for.
              </p>
            </div>
            <div>
              <Button variant={"default"} className="px-10" asChild>
                <Link to={""}>See Videos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-fit py-12 md:py-24 lg:py-32 rounded-xl bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <img
              src={HomeOutline2}
              width="550"
              height="310"
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge>Planning</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl ">
                  Save time planning sessions
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Never be pushed for time again, access the soccer session plan
                  archive to pick one of our tried and tested, professional
                  soccer plans, ready use straight away. Or create your own
                  session with your favourite drills in just one click.
                </p>
              </div>
              <div>
                <Button variant={"default"} className="px-10" asChild>
                  <Link to={""}>See Videos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            src={HomeOutline3}
            width="550"
            height="310"
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge>Coaching</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Organise your coaching resources
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Store all of your soccer coaching content in one place with an
                unlimited amount of storage in your folders. Add your favourite
                pieces of content to your own space to use later on and filter
                them to find exactly what you need.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                variant={"default"}
                className="px-10 border-gray-700"
                asChild
              >
                <Link to={""}>See Videos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default HomePage;
