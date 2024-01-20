import { CardTitle, CardDescription, Card } from "@/lib/utils/ui/card";
import { Badge } from "@/lib/utils/ui/badge";
import { ResponsiveBar } from "@nivo/bar";
import { AvatarImage, Avatar } from "@/lib/utils/ui/avatar";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import { ClassAttributes, HTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";
import DashboardLayout from "../layout/layout";
import BreadCrumb from "../components/breadcrumb";

const breadcrumbItems = [{ title: "Dashboard", link: "" }];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-8">
        <BreadCrumb items={breadcrumbItems} />
        <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <Card className="bg-white p-4">
            <CardTitle>Total Player</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              3409
            </CardDescription>
            <Badge variant="secondary">+20.1% from last month</Badge>
          </Card>
          <Card className="bg-white p-4">
            <CardTitle>Daily Practiced</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              2350
            </CardDescription>
            <Badge variant="secondary">-18.1% from last month</Badge>
          </Card>
          <Card className="bg-white p-4">
            <CardTitle>Sales</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              +12,234
            </CardDescription>
            <Badge variant="secondary">+19% from last month</Badge>
          </Card>
          <Card className="bg-white p-4">
            <CardTitle>Total Videos</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              573
            </CardDescription>
            <Badge variant="secondary">2 in last days</Badge>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
          <Card className="bg-white p-4 lg:col-span-2">
            <CardTitle>Overview</CardTitle>
            <BarChart className="w-full h-[300px]" />
          </Card>
          <Card className="bg-white p-4">
            <CardTitle>Recent Players</CardTitle>
            <CardDescription>You made 34 player in this month.</CardDescription>
            <ScrollArea className="space-y-4 p-4 h-[300px]">
              <PlayerCard
                imageUrl="https://i.pravatar.cc/150?img=64"
                name="William Kim"
                email="will@email.com"
              />
              <PlayerCard
                imageUrl="https://i.pravatar.cc/150?img=64"
                name="William Kim"
                email="will@email.com"
              />
              <PlayerCard
                imageUrl="https://i.pravatar.cc/150?img=64"
                name="William Kim"
                email="will@email.com"
              />
              <PlayerCard
                imageUrl="https://i.pravatar.cc/150?img=64"
                name="William Kim"
                email="will@email.com"
              />
              <PlayerCard
                imageUrl="https://i.pravatar.cc/150?img=64"
                name="William Kim"
                email="will@email.com"
              />
              <PlayerCard
                imageUrl="https://i.pravatar.cc/150?img=64"
                name="William Kim"
                email="will@email.com"
              />
              <PlayerCard
                imageUrl="https://i.pravatar.cc/150?img=64"
                name="William Kim"
                email="will@email.com"
              />
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

function PlayerCard({
  imageUrl,
  name,
  email,
}: {
  imageUrl: string;
  name: string;
  email: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage alt="Sofia Davis" src={imageUrl} />
      </Avatar>
      <div>
        <div>{name}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </div>
    </div>
  );
}
