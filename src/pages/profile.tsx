/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/utils/ui/card";
import { Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/utils/ui/avatar";
import { Button } from "@/lib/utils/ui/button";
import { Separator } from "@/lib/utils/ui/separator";
import { useState } from "react";
import { Label } from "@/lib/utils/ui/label";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import PersonalInformation from "@/components/profile/profile-info";
import ChangePassword from "@/components/profile/change-password";
import { getAvatarFallbackLetter } from "@/lib/utils";
import { Link } from "react-router-dom";

function validateImage(selectedImage: any): boolean {
  const maxSize = 5 * 1024 * 1024;
  if (!selectedImage) {
    toast.error("Thumbnail is required");
    return false;
  } else if (selectedImage.size > maxSize) {
    toast.error("Thumbnail exceeds maximum file size (5MB)");
    return false;
  } else {
    const allowedFormats = ["jpg", "jpeg", "png", "webp"];
    const fileNameParts = selectedImage.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      toast.error("Thumbnail format is not supported(jpg,jpeg,png,webp)");
      return false;
    }
    return true;
  }
}

export default function ProfilePage() {
  const { auth }: any = useAuth();
  const { authAxios }: any = useAxios();
  const [avatarImage, setAvatarImage] = useState(auth.user?.avatar || null);

  const handleAvatarChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result);
      };
      reader.readAsDataURL(file);

      if (validateImage(file)) {
        const formData = new FormData();
        formData.append("avatar", file);
        toast.promise(
          authAxios.put("/user/update-avatar", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            loading: "Updating...",
            success: (response: any) => {
              return response.data.message;
            },
            error: (error: any) => {
              return error.response.data.message;
            },
          }
        );
      }
    }
  };

  return (
    <div className="space-y-10 mb-10 mt-5">
      <Card className="grid grid-cols-1 md:grid-cols-5 border-none shadow-none gap-4">
        <Card className="py-4 md:col-span-5 lg:col-span-3 pt-0 overflow-hidden">
          <CardHeader className="relative flex flex-col gap-1 justify-center items-center bg-gray-300 overflow-hidden">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    className="aspect-square"
                    src={avatarImage}
                    alt="@shadcn"
                  />
                  <AvatarFallback className="text-xl">
                    {getAvatarFallbackLetter(auth.user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleAvatarChange}
                  id="avatarInput"
                />

                <Button
                  className="h-8 w-8 absolute top-8 -right-4 bg-gray-700 text-white p-2 rounded-full"
                  asChild
                >
                  <Label htmlFor="avatarInput">
                    <Image />
                  </Label>
                </Button>
              </div>
              <CardTitle className="relative text-2xl font-bold ">
                {auth.user.firstName} {auth.user.lastName}
              </CardTitle>
            </div>
          </CardHeader>
          <Separator className="mb-4" />
          <PersonalInformation />
        </Card>

        <Card className="col-span-5 lg:col-span-2 flex lg:flex-col justify-between gap-3 border-none shadow-none">
          <ChangePassword />

          <Card className="flex-1 py-5 h-fit">
            <CardContent>
              <CardTitle>Watch History</CardTitle>
              <CardDescription className="mt-2">
                These are video recent history.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col py-0 overflow-hidden gap-2">
              {auth.user?.watchHistory?.map((video: any) => (
                <Link
                  key={video?._id}
                  to={`/videos/${video?.slug}`}
                  className="w-full flex gap-3 bg-gray-50 rounded-md p-1"
                >
                  <img className="w-14 rounded-sm" src={video?.thumbnail} />
                  <div>
                    <h3>{video?.title}</h3>
                    <p>{video?.dutation}</p>
                  </div>
                </Link>
              ))}
            </CardFooter>
          </Card>
        </Card>
      </Card>
    </div>
  );
}
