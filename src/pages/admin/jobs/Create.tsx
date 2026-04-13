import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const jobSchema = z.object({
   title: z
      .string()
      .min(5, "Title must be at least 5 characters.")
      .max(100, "Title must be at most 100 characters."),
      description: z 
         .string()
         .min(20, "Description must be at least 20 characters."),
   category: z.string().min(1, "Category is required."),
   location: z.string().optional(),
   jobType: z.enum(
      ["full-time", "part-time", "contract", "internship"],
      "Please select a job type.",
   ),
   workMode: z.enum(
      ["remote", "onsite", "hybrid"],
      "Please select a work mode.",
   ),
   salary: z
      .object({
         min: z.number().nullable().optional(),
         max: z.number().nullable().optional(),
      }).optional(),
      
   experience: z.enum(
      ["entry", "junior", "mid", "senior", "lead", "executive"],
      "Please select experience level.",
   ),
   education: z.enum(
      ["high-school", "bachelor", "master", "phd", "none"],
      "Please select education level.",
   ),
   skills: z
      .array(z.string().min(1))
      .min(1, "At least one skill is required.")
      .optional(),
   status: z.enum(["draft", "active", "expired"]).default("active"),
   isFeatured: z.boolean().default(false),
   isUrgent: z.boolean().default(false),
});

type JobFormData = z.infer<typeof jobSchema>;

const Create = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
      defaultValues: {
         title: "",
         category: "",
         description: "",
         location: "",
         jobType: "full-time",
         workMode: "onsite",
         experience: "entry",
         education: "none",
         skills: [],
         status: "active",
         isFeatured: false,
         isUrgent: false
      },
  });

  function onSubmit(data: z.infer<typeof jobSchema>) {
    console.log(data);
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Create Job</h2>
        <p className="text-sm text-slate-400">Publish your new job here</p>
      </div>

      <div className="bg-white rounded-xl p-5">
        <form
          id="form-rhf-demo"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700">
                Job Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Frontent Developer"
                {...register("title")}
                className="min-h-10"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full min-h-10">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="restaurants">Restaurants</SelectItem>
                        <SelectItem value="banking">Banking</SelectItem>
                        <SelectItem value="schools">Schools</SelectItem>
                        <SelectItem value="shops">Shops</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full min-h-10">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="restaurants">Restaurants</SelectItem>
                        <SelectItem value="banking">Banking</SelectItem>
                        <SelectItem value="schools">Schools</SelectItem>
                        <SelectItem value="shops">Shops</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full min-h-10">
                      <SelectValue placeholder="Select a jobType" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="restaurants">Restaurants</SelectItem>
                        <SelectItem value="banking">Banking</SelectItem>
                        <SelectItem value="schools">Schools</SelectItem>
                        <SelectItem value="shops">Shops</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="e.g. Frontent Developer"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit" className="min-h-10">
              Publish Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
