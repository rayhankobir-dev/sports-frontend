import { Button } from "@/lib/utils/ui/button";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/lib/utils/ui/accordion";
import GoalSvg from "../assets/goal.svg";
import PlayerSvg from "../assets/payler.svg";
import { Link } from "react-router-dom";
import { Fragment } from "react";

export default function AboutPage() {
  return (
    <Fragment>
      <section className="w-full py-12 md:py-20 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                About Soccer Inc
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Acme Inc is a leading provider of business solutions, offering a
                range of services that help companies succeed.
              </p>
            </div>
            <div className="max-w-6xl pt-14 grid md:grid-cols-2">
              <img
                src={PlayerSvg}
                width={300}
                alt="Image"
                className="mx-auto overflow-hidden rounded-xl"
              />
              <p className="text-left text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita praesentium dignissimos inventore fugit vel
                consequuntur quo placeat dolor fugiat sint in ducimus modi
                officia natus laborum tempore molestias, accusamus. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Rerum, obcaecati
                expedita iusto id quidem iure harum voluptatum dicta repellat
                eos facilis soluta accusamus amet eligendi ea perspiciatis
                ratione et hic!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            src={GoalSvg}
            alt="Image"
            className="mx-auto overflow-hidden rounded-xl w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Soccer
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Mission & Values
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Soccer Inc is a leading provider of business solutions, offering
                a range of services that help companies succeed.
              </p>
              <p className="pt-3 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Never be short of ideas with our ever growing collection of
                Football drills. With pro drills and the community section, the
                inspiration is constantly growing. Browse Football drills by
                category or use the search bar to quickly find what you're
                looking for.
              </p>
            </div>
            <div>
              <Button>
                <Link to="/">Check services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-bold tracking-tighter text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-xl mx-auto text-gray-500 md:text-lg dark:text-gray-400">
                Here are some common questions about our products and services.
              </p>
            </div>
            <div className="w-full max-w-xl mx-auto pt-10">
              <Accordion className="w-full" collapsible type="single">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What services do you offer?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    We offer a wide range of business solutions including
                    consulting, analytics, and software development.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How can I contact customer support?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    You can contact our customer support team via email at
                    support@acmeinc.com or call us at (123) 456-7890.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What is your refund policy?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    We offer a 30-day money back guarantee on all our products.
                    If you're not satisfied, you can request a full refund
                    within 30 days of purchase.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
