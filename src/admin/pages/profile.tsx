import DashboardLayout from "../layout/layout";
import { AvatarImage, AvatarFallback, Avatar } from "@/lib/utils/ui/avatar";
import {
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
  CardHeader,
} from "@/lib/utils/ui/card";
import { Button } from "@/lib/utils/ui/button";
import { Label } from "@/lib/utils/ui/label";
import { Input } from "@/lib/utils/ui/input";
import { Textarea } from "@/lib/utils/ui/textarea";
import BreadCrumb from "../components/breadcrumb";
import { Heading } from "@/lib/utils/ui/heading";
import { Separator } from "@/lib/utils/ui/separator";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];

function UserProfilePage() {
  return (
    <DashboardLayout>
      <section className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
          <Heading
            title="Admin Profile"
            description="Profile with personal information"
          />
        </div>
        <Separator />

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
          <aside className="w-full lg:w-1/4">
            <Card className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 my-4">
                <AvatarImage alt="Admin" src="/placeholder-avatar.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <CardTitle>Admin</CardTitle>
              <CardDescription>Job Title</CardDescription>
              <CardContent className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  euismod eget lorem quis pharetra.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Edit Profile Image</Button>
              </CardFooter>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <strong>Name:</strong> Admin
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> admin@example.com
                </p>
                <p className="text-sm">
                  <strong>Job Title:</strong> Job Title
                </p>
                <p className="text-sm">
                  <strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Sed euismod eget lorem quis pharetra.
                </p>
              </CardContent>
            </Card>
          </aside>
          <main className="w-full lg:w-3/4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job">Job Title</Label>
                  <Input id="job" placeholder="Enter your job title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    className="min-h-[100px]"
                    id="bio"
                    placeholder="Enter your bio"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto px-10">Save</Button>
              </CardFooter>
            </Card>
          </main>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default UserProfilePage;
