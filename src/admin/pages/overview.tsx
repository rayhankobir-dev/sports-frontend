import { TabsTrigger, TabsList, Tabs } from "@/lib/utils/ui/tabs";
import { CardTitle, CardDescription, Card } from "@/lib/utils/ui/card";
import { Badge } from "@/lib/utils/ui/badge";
import { ResponsiveBar } from "@nivo/bar";
import { AvatarImage, Avatar } from "@/lib/utils/ui/avatar";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { ClassAttributes, HTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";
import DashboardLayout from "../layout/layout";

export default function Overview() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>
        <Tabs>
          <TabsList>
            <TabsTrigger value="" className="font-medium">
              Overview
            </TabsTrigger>
            <TabsTrigger value="" className="font-medium">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="" className="font-medium">
              Reports
            </TabsTrigger>
            <TabsTrigger value="" className="font-medium">
              Notifications
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <Card className="bg-white p-4">
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              $45,231.89
            </CardDescription>
            <Badge variant="secondary">+20.1% from last month</Badge>
          </Card>
          <Card className="bg-white p-4">
            <CardTitle>Subscriptions</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              +2350
            </CardDescription>
            <Badge variant="secondary">+18.1% from last month</Badge>
          </Card>
          <Card className="bg-white p-4">
            <CardTitle>Sales</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              +12,234
            </CardDescription>
            <Badge variant="secondary">+19% from last month</Badge>
          </Card>
          <Card className="bg-white p-4">
            <CardTitle>Active Now</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              +573
            </CardDescription>
            <Badge variant="secondary">+201 since last hour</Badge>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
          <Card className="bg-white p-4 lg:col-span-2">
            <CardTitle>Overview</CardTitle>
            <BarChart className="w-full h-[300px]" />
          </Card>
          <Card className="bg-white p-4">
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
            <ScrollArea className="space-y-4 p-4 h-[300px]">
              <div className="flex justify-between items-center">
                <Avatar>
                  <AvatarImage
                    alt="Olivia Martin"
                    src="/placeholder.svg?height=40&width=40"
                  />
                </Avatar>
                <div>
                  <div>Olivia Martin</div>
                  <div className="text-sm text-gray-500">
                    olivia.martin@email.com
                  </div>
                </div>
                <div className="font-semibold">+$1,999.00</div>
              </div>
              <div className="flex justify-between items-center">
                <Avatar>
                  <AvatarImage
                    alt="Jackson Lee"
                    src="/placeholder.svg?height=40&width=40"
                  />
                </Avatar>
                <div>
                  <div>Jackson Lee</div>
                  <div className="text-sm text-gray-500">
                    jackson.lee@email.com
                  </div>
                </div>
                <div className="font-semibold">+$39.00</div>
              </div>
              <div className="flex justify-between items-center">
                <Avatar>
                  <AvatarImage
                    alt="Isabella Nguyen"
                    src="/placeholder.svg?height=40&width=40"
                  />
                </Avatar>
                <div>
                  <div>Isabella Nguyen</div>
                  <div className="text-sm text-gray-500">
                    isabella.nguyen@email.com
                  </div>
                </div>
                <div className="font-semibold">+$299.00</div>
              </div>
              <div className="flex justify-between items-center">
                <Avatar>
                  <AvatarImage
                    alt="William Kim"
                    src="/placeholder.svg?height=40&width=40"
                  />
                </Avatar>
                <div>
                  <div>William Kim</div>
                  <div className="text-sm text-gray-500">will@email.com</div>
                </div>
                <div className="font-semibold">+$99.00</div>
              </div>
              <div className="flex justify-between items-center">
                <Avatar>
                  <AvatarImage
                    alt="Sofia Davis"
                    src="/placeholder.svg?height=40&width=40"
                  />
                </Avatar>
                <div>
                  <div>Sofia Davis</div>
                  <div className="text-sm text-gray-500">
                    sofia.davis@email.com
                  </div>
                </div>
                <div className="font-semibold">+$39.00</div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function BarChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}
