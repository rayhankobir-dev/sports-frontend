/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/lib/utils/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/utils/ui/form";
import { Label } from "@/lib/utils/ui/label";
import { Heading } from "@/lib/utils/ui/heading";
import { Input } from "@/lib/utils/ui/input";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/utils/ui/select";
import { Separator } from "@/lib/utils/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  gender: z.string().min(1, { message: "Please select gender!" }),
  genre: z.string().min(1, { message: "Please select genre!" }),
  firstName: z
    .string()
    .min(3, { message: "First name must be grater than 3 characters!" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be grater than 3 characters!" }),
  email: z.string().min(3, { message: "Plase enter valid email" }),
  password: z.string().min(3, { message: "Plase enter password" }),
  phone: z.number().min(10, { message: "Plase enter phone number!" }),
  height: z.number().min(3, { message: "Plase enter height!" }),
  weight: z.number().min(3, { message: "Plase enter weight!" }),
  avatar: z.string().url({ message: "Please enter a valid image URL" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genders: any;
}

export const CoachAddForm: React.FC<ProductFormProps> = ({
  initialData,
  genders,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Coach" : "Add Coach";
  const description = initialData ? "Edit a coach." : "Add a new coach";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        height: 0.0,
        weight: 0.0,
        avatar: "",
        gender: "",
        genre: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log(open);
    try {
      console.log(data);
      setLoading(true);

      console.log({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />
      <Form {...form}>
        <ScrollArea className="h-full">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-1 space-y-8 w-full relative"
          >
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 md:gap-y-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <Label>First name</Label>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <Label>Last name</Label>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={loading}
                        placeholder="Email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={loading}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label>Phone</Label>
                    <FormControl>
                      <Input
                        type="tel"
                        disabled={loading}
                        placeholder="Phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label>Specialization</Label>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="eg:Drills"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Label>Gender</Label>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select Gender"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders?.map((gender: any) => (
                          <SelectItem key={gender._id} value={gender._id}>
                            {gender.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <Label>Avatar</Label>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={loading}
                        {...field}
                        accept=".jpg, .jpeg, .png"
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <Label>Addition information</Label>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        {...field}
                        placeholder="Write about yourself"
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={loading}
              className="ml-auto min-w-fit w-1/4"
              type="submit"
            >
              {action}
            </Button>
          </form>
        </ScrollArea>
      </Form>
    </>
  );
};
