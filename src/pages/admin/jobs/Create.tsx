import { useState, type KeyboardEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { jobsService } from "@/services/jobService";
import { toast } from "sonner";



const jobSchema = z.object({
   title: z.string().min(5, "Title must be at least 5 characters.").max(100, "Title must be at most 100 characters"),
   description: z.string().min(20, "Description must be at least 20 characters."),
   category: z.string().min(1, "Category is required."),
   location: z.string().optional(),
   jobType: z.enum(["full-time", "part-time", "contract", "internship"], { message: "Please select a job type."}),
   workMode: z.enum(["remote", "onsite", "hybrid"], { message: "Please select a work mode."}),
   salary: z.object({ min: z.number().nullable().optional(), max: z.number().nullable().optional()}).optional(),
   experience: z.enum(["entry", "junior", "mid", "senior", "lead", "executive"], { message: "Please select experience level."}),
   education: z.enum(["high-school", "bachelor", "master", "phd", "none"], { message: "Please select education level."}),
   skills: z.array(z.string().min(1)).min(1, "At least one skill is required.").optional(),
   status: z.enum(["draft", "active", "expired"]),
   isFeatured: z.boolean(),
   isUrgent: z.boolean(),
});

export type JobFormData = z.infer<typeof jobSchema>;

const Create = () => {
   const [skillInput, setSkillInput] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
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

  const skills = watch("skills") || [];
  const isFeatured = watch("isFeatured");
  const isUrgent = watch("isUrgent");

   const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === "Enter"){
         e.preventDefault();
         const skill = skillInput.trim();
         if(skill && !skills.includes(skill)){
            setValue("skills", [...skills, skill])
            setSkillInput("");
         }
      }
   }

   const removeSkill = (skill: string) => {
      setValue("skills", skills.filter((s) => s !== skill));
   }

   const onSubmit = async (data: JobFormData) => {
      setIsSubmitting(true);

      try {
         const result = await jobsService.createJob(data);
         toast.success("Job created!");
      } catch (err) {
         
      } finally{
         setIsSubmitting(false);
      }
   }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Create Job</h2>
        <p className="text-sm text-slate-400">Publish your new job here</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200">
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
                        <SelectTrigger id="category" className="w-full min-h-10">
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
                        <SelectTrigger id="location" className="w-full min-h-10">
                           <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Locations</SelectLabel>
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
                  {errors.location && (
                     <p className="text-sm text-red-500">
                        {errors.location.message}
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
                           <SelectTrigger id="jobType" className="w-full min-h-10">
                                 <SelectValue placeholder="Select a Type" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 <SelectLabel>Job Types</SelectLabel>
                                 <SelectItem value="full-time">Full-time</SelectItem>
                                 <SelectItem value="part-time">Part-time</SelectItem>
                                 <SelectItem value="contract">Contract</SelectItem>
                                 <SelectItem value="internship">Internship</SelectItem>
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     )}
                  />
                  {errors.jobType && (
                     <p className="text-sm text-red-500">
                        {errors.jobType.message}
                     </p>
                  )}
               </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="description">Description</Label>
               <Textarea
                  id="description"
                  placeholder="e.g. Job description"
                  {...register("description")}
                  className="min-h-40"
               />
                  {errors.description && (
                  <p className="text-sm text-red-500">
                     {errors.description.message}
                  </p>
               )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="workMode">Work Mode</Label>
                  <Controller
                     name="workMode"
                     control={control}
                     render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="workMode" className="w-full min-h-10">
                           <SelectValue placeholder="Select a mode" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Modes</SelectLabel>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="onsite">Onsite</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                        </Select>
                     )}
                  />
                  {errors.location && (
                     <p className="text-sm text-red-500">
                        {errors.location.message}
                     </p>
                  )}
               </div>
               <div className="space-y-2">
               <Label htmlFor="experience">Experience</Label>
               <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                     <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="experience" className="w-full min-h-10">
                              <SelectValue placeholder="Select Experience" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Job Types</SelectLabel>
                              <SelectItem value="entry">Entry</SelectItem>
                              <SelectItem value="junior">Junior</SelectItem>
                              <SelectItem value="mid">Mid</SelectItem>
                              <SelectItem value="senior">Senior</SelectItem>
                              <SelectItem value="lead">Lead</SelectItem>
                              <SelectItem value="executive">Executive</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  )}
               />
               {errors.experience && (
                  <p className="text-sm text-red-500">
                     {errors.experience.message}
                  </p>
               )}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Controller
                     name="education"
                     control={control}
                     render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="education" className="w-full min-h-10">
                           <SelectValue placeholder="Select a mode" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Modes</SelectLabel>
                              <SelectItem value="high-school">High-school</SelectItem>
                              <SelectItem value="bachelor">Bachelor</SelectItem>
                              <SelectItem value="master">Master</SelectItem>
                              <SelectItem value="phd">Phd</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                        </Select>
                     )}
                  />
                  {errors.education && (
                     <p className="text-sm text-red-500">
                        {errors.education.message}
                     </p>
                  )}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                     id="skills"
                     value={skillInput}
                     onChange={(e) => setSkillInput(e.target.value)}
                     onKeyDown={handleSkillKeyDown}
                     className="min-h-10"
                     placeholder="Type a skill and press Enter"
                  />
                  {skills.length > 0 && (
                     <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                           <span key={skill} className="flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-1 rounded-md">
                              {skill}
                              <Button onClick={() => removeSkill(skill)} variant="ghost" type="button" size="xs" className="h-5 w-5 hover:text-gray-800">
                                 <X size={12} />
                              </Button>
                           </span>
                        ))}
                     </div>
                  )}
                  {errors.experience && (
                     <p className="text-sm text-red-500">
                        {errors.experience.message}
                     </p>
                  )}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="isFeatured">Is Featured</Label>
                  <Checkbox
                     id="isFeatured"
                     checked={isFeatured}
                     onCheckedChange={(checked) => setValue("isFeatured", checked as boolean)}
                     className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  {errors.location && (
                     <p className="text-sm text-red-500">
                        {errors.location.message}
                     </p>
                  )}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="isUrgent">Is Urgent</Label>
                  <Checkbox
                     id="isUrgent"
                     checked={isUrgent}
                     onCheckedChange={(checked) => setValue("isUrgent", checked as boolean)}
                     className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  {errors.experience && (
                     <p className="text-sm text-red-500">
                        {errors.experience.message}
                     </p>
                  )}
               </div>
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
