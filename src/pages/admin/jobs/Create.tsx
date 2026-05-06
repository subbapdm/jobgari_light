import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Check, MapPin, Sparkle, Sparkles, Wifi } from "lucide-react";
import { getYear } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jobsService } from "@/services/jobService";

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";
import { locationService } from "@/services/locationService";
import { companyService } from "@/services/companyService";
import { Switch } from "@/components/ui/switch";
import FormRadioGroup from "@/components/form/FormRadioGroup";
import FormRadioTab from "@/components/form/FormRadioTab";
import FormSection from "@/components/form/FormSection";
import TextEditor from "@/components/form/TextEditor";
import FormSelect from "@/components/form/FormSelect";
import { FormDate } from "@/components/form/FormDate";
import { slugify } from "@/utils/helper";
import BadgeInput from "@/components/form/BadgeInput";
import SalaryInput from "@/components/form/SalaryInput";
import { cn } from "@/lib/utils";

const jobSchema = z.object({
   title: z
      .string()
      .min(5, "Title must be at least 5 characters.")
      .max(100, "Title must be at most 100 characters"),
   slug: z
      .string()
      .min(3, "Slug is required")
      .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, hyphens"),
   description: z
      .string()
      .min(20, "Description must be at least 20 characters."),
   category: z.string().min(1, "Category is required."),
   deadline: z.date(),
   company: z.string().min(1, "Company is required."),
   location: z.string().optional(),
   jobType: z.enum(["full-time", "part-time", "contract", "internship"], {
      message: "Please select a job type.",
   }),
   workMode: z.enum(["remote", "onsite", "hybrid"], {
      message: "Please select a work mode.",
   }),
   salary: z.object({
      min: z.number().min(0).optional(),
      max: z.number().min(0).optional(),
      currency: z.enum(["USD", "EUR", "GBP"]),
      period: z.enum(["hourly", "monthly", "annually"]),
      undisclosed: z.boolean(),
   }).refine(
      (s) => s.undisclosed || s.min === undefined || s.max === undefined || s.min <= s.max,
      { message: "Min salary cannot exceed max salary", path: ["max"] }
   ),
   experience: z.enum(
      ["entry", "junior", "mid", "senior", "lead", "executive"],
      { message: "Please select experience level." },
   ),
   education: z.enum(["high-school", "bachelor", "master", "phd", "none"], {
      message: "Please select education level.",
   }),
   skills: z
      .array(z.string().min(1))
      .min(1, "At least one skill is required.")
      .optional(),
   status: z.enum(["draft", "active", "expired"]),
   isFeatured: z.boolean(),
   isUrgent: z.boolean(),
});

export type JobFormData = z.infer<typeof jobSchema>;

const Create = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const hasManualSlug = useRef(false);

   const { data: companiesData, isLoading: loadingCompanies } = useQuery({
      queryKey: ["companies"],
      queryFn: () => companyService.getCompanies(),
      staleTime: 5 * 60 * 1000,
   });

   const { data: categoriesData, isLoading: loadingCategories } = useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryService.getCategories(),
      staleTime: 5 * 60 * 1000,
   });

   const { data: locationsData, isLoading: loadingLocations } = useQuery({
      queryKey: ["locations"],
      queryFn: () => locationService.getLocations(),
      staleTime: 5 * 60 * 1000,
   });

   const locationOptions = useMemo(() => {
      return (
         locationsData?.locations.map((l) => ({
         value: l._id,
         label: l.city,
         })) ?? []
      );
   }, [locationsData]);

   const categoryOptions = useMemo(() => {
      return (
         categoriesData?.categories.map((c) => ({
         value: c._id,
         label: c.name,
         })) ?? []
      );
   }, [categoriesData]);

   const companyOptions = useMemo(() => {
      return (
         companiesData?.companies?.map((c) => ({
         value: c._id,
         label: c.name,
         })) ?? []
      );
   }, [companiesData]);

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
         slug: "",
         company: "",
         description: "",
         category: "",
         deadline: undefined,
         location: "",
         jobType: "full-time",
         workMode: "onsite",
         experience: "entry",
         education: "none",
         salary: {
            currency: "USD",
            period: "monthly",
            undisclosed: false
         },
         skills: [],
         status: "active",
         isFeatured: true,
         isUrgent: false,
      },
   });

   // Generate slug
   const title = watch("title");
   useEffect(() => {
      if(hasManualSlug.current) return; // User took control - stop overwriting
      const generatedSlug = slugify(title);
      setValue("slug", generatedSlug)
   }, [title, setValue]);


   const salary = watch("salary");
   console.log(salary);

   const slugRegistration = register("slug");

   const onSubmit = async (data: JobFormData) => {
      setIsSubmitting(true);

      try {
         const result = await jobsService.createJob(data);
         toast.success("Job created!");
      } catch (err) {
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="space-y-4">
         <div>
         <h2 className="text-2xl font-bold text-slate-800">Create Job</h2>
         <p className="text-sm text-slate-400">
            Fill in the details to publish new open position.
         </p>
         </div>

         <div className="">
         <form
            id="form-rhf-demo"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
         >
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
               {/* LEFT */}
               <div className="min-w-0 space-y-6">
                  <FormSection className="p-5 border border-gray-200 space-y-6 rounded-md">

                     <div className="space-y-2">
                        <Label
                           htmlFor="title"
                           className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                        >
                           Job Title
                        </Label>
                        <Input
                           id="title"
                           {...register("title")}
                           placeholder="e.g. Frontent Developer"
                           className="min-h-11 rounded-sm focus-visible:border focus-visible:border-teal-200 focus-visible:ring-1 focus-visible:ring-teal-200"
                        />
                        {errors.title && (
                           <p className="text-xs text-red-500">
                                 {errors.title.message}
                           </p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <Label
                           htmlFor="slug"
                           className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                        >
                           Slug
                        </Label>
                        <Input
                           id="slug"
                           {...slugRegistration}
                           onChange={(e) => {
                              hasManualSlug.current = true; // User is manually editing
                              slugRegistration.onChange(e)
                           }}
                           placeholder="e.g. Frontent Developer"
                           className="min-h-11 rounded-sm focus-visible:border focus-visible:border-teal-200 focus-visible:ring-1 focus-visible:ring-teal-200"
                        />
                        {errors.slug && (
                           <p className="text-xs text-red-500">
                              {errors.slug.message}
                           </p>
                        )}
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        <div className="space-y-2">
                           <Label
                              htmlFor="company"
                              className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                           >
                              Company
                           </Label>
                           <Controller
                              name="company"
                              control={control}
                              render={({ field }) => (
                                 <FormSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={companyOptions}
                                    placeholder="Select a company"
                                    label="Companies"
                                    disabled={loadingCompanies}
                                    isLoading={loadingCompanies}
                                    id="company"
                                    className="min-h-11 rounded-sm focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
                                 />
                              )}
                           />
                           {errors.company && (
                              <p className="text-xs text-red-500">
                                 {errors.company.message}
                              </p>
                           )}
                        </div>
                        <div className="space-y-2">
                           <Label
                              htmlFor="deadline"
                              className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                           >
                              Dealine
                           </Label>
                           <Controller
                              name="deadline"
                              control={control}
                              render={({ field }) => (
                                 <FormDate
                                    value={field.value}
                                    onChange={field.onChange}
                                    startYear={getYear(new Date())}
                                    endYear={getYear(new Date()) + 5}
                                    className="min-h-11 text-gray-500 font-normal rounded-sm"
                                 />
                              )}
                           />
                           {errors.deadline && (
                              <p className="text-xs text-red-500">
                                 {errors.deadline.message}
                              </p>
                           )}
                        </div>
                        <div className="space-y-2">
                           <Label
                              htmlFor="category"
                              className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                           >
                              Category
                           </Label>
                           <Controller
                              name="category"
                              control={control}
                              render={({ field }) => (
                                 <FormSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={categoryOptions}
                                    placeholder="Select a categroy"
                                    label="Categories"
                                    disabled={loadingCategories}
                                    id="category"
                                    isLoading={loadingCategories}
                                    className="min-h-11 rounded-sm focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
                                 />
                              )}
                           />
                           {errors.category && (
                              <p className="text-xs text-red-500">
                                 {errors.category.message}
                              </p>
                           )}
                        </div>
                        <div className="space-y-2">
                           <Label
                              htmlFor="location"
                              className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                           >
                              Location
                           </Label>
                           <Controller
                              name="location"
                              control={control}
                              render={({ field }) => (
                                 <FormSelect
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    options={locationOptions}
                                    placeholder="Select a location"
                                    label="Location"
                                    disabled={loadingLocations}
                                    id="location"
                                    isLoading={loadingLocations}
                                    className="min-h-11 rounded-sm focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
                                 />
                              )}
                           />
                           {errors.location && (
                              <p className="text-xs text-red-500">
                                 {errors.location.message}
                              </p>
                           )}
                        </div>
                        <div className="space-y-2">
                           <Label
                              htmlFor="experience"
                              className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                           >
                              Experience
                           </Label>
                           <Controller
                              name="experience"
                              control={control}
                              render={({ field }) => (
                                 <FormSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                    { value: "entry", label: "Entry" },
                                    { value: "junior", label: "Junior" },
                                    { value: "mid", label: "Mid" },
                                    { value: "senior", label: "Senior" },
                                    { value: "lead", label: "Lead" },
                                    { value: "executive", label: "Executive" },
                                    ]}
                                    placeholder="Select experience"
                                    label="Experience"
                                    id="experience"
                                    className="min-h-11 rounded-sm focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
                                 />
                              )}
                           />
                           {errors.experience && (
                              <p className="text-xs text-red-500">
                                 {errors.experience.message}
                              </p>
                           )}
                        </div>
                        <div className="space-y-2">
                           <Label
                              htmlFor="education"
                              className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                           >
                              Education
                           </Label>
                           <Controller
                              name="education"
                              control={control}
                              render={({ field }) => (
                                 <FormSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                    { value: "high-school", label: "High-school" },
                                    { value: "bachelor", label: "Bachelor" },
                                    { value: "master", label: "Master" },
                                    { value: "phd", label: "Phd" },
                                    { value: "none", label: "None" },
                                    ]}
                                    placeholder="Select education"
                                    label="Education"
                                    id="education"
                                    className="min-h-11 rounded-sm focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
                                 />
                              )}
                           />
                           {errors.education && (
                              <p className="text-xs text-red-500">
                                 {errors.education.message}
                              </p>
                           )}
                        </div>
                     </div>

                  </FormSection>

                  <FormSection className="p-5 border border-gray-200 space-y-5 rounded-md">
                     <div>
                        <div className="flex items-center justify-between">
                           <Label htmlFor="description" className="text-[0.85rem] font-semibold text-gray-700 leading-tight">
                              Job Description <span className="text-red-500">*</span>
                           </Label>
                           <Button type="button" variant="link" className="flex items-center text-[0.75rem] text-teal-700 font-semibold gap-1 cursor-pointer hover:no-underline">
                              <Sparkles className="size-4" />
                              <span>AI Generate</span>
                           </Button>
                        </div>
                        <Controller
                           name="description"
                           control={control}
                           render={({ field }) => (
                              <TextEditor
                                 value={field.value}
                                 onChange={field.onChange}
                                 placeholder="Describe the role, responsibilities, requirements..."
                                 className="rounded-sm min-h-90"
                              />
                           )}
                        />
                     </div>
                  </FormSection>

               </div>

               {/* RIGHT */}
               <aside className="xl:sticky xl:top-28 xl:self-start space-y-6">
                  <FormSection className="p-5 border border-gray-200 space-y-6 rounded-md">
                     <div className="space-y-2">
                        <Label
                           htmlFor="jobType"
                           className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                        >
                           Job Type
                        </Label>

                        <FormRadioGroup
                           control={control}
                           name="jobType"
                           size="sm"
                           options={[
                              { value: "full-time", label: "Full-Time" },
                              { value: "part-time", label: "Part-Time" },
                              { value: "contract", label: "Contract" },
                              { value: "internship", label: "Internship" },
                           ]}
                        />

                        {errors.jobType && (
                           <p className="text-xs text-red-500">
                              {errors.jobType.message}
                           </p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <Label
                           htmlFor="workMode"
                           className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                        >
                           Work Mode
                        </Label>

                        <FormRadioTab
                           control={control}
                           name="workMode"
                           options={[
                              { value: "remote", label: "Remote", icon: Wifi },
                              { value: "hybrid", label: "Hybrid", icon: Building2 },
                              { value: "onsite", label: "Onsite", icon: MapPin },
                           ]}
                        />
                        {errors.workMode && (
                           <p className="text-xs text-red-500">
                              {errors.workMode.message}
                           </p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <Controller
                           name="salary"
                           control={control}
                           render={({ field }) => (
                              <SalaryInput
                                 value={field.value}
                                 onChange={field.onChange}
                                 className="min-h-11 rounded-sm"
                              />
                           )} 
                        />
                        {errors.salary?.max && (
                           <p className="text-xs text-red-500">
                              {errors.salary.max.message}
                           </p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <Label
                           htmlFor="skills"
                           className="text-[0.85rem] font-semibold text-gray-700 leading-tight"
                        >
                        Skills
                        </Label>
                        <Controller
                           name="skills"
                           control={control}
                           render={({ field }) => (
                              <BadgeInput
                                 value={field.value ?? []}
                                 onChange={field.onChange}
                                 placeholder="Add skill..."
                                 suggestings={["Prototyping", "Photoshop", "Maya"]}
                                 className="min-h-11 rounded-md bg-gray-50 focus-within:border-teal-100 focus-within:ring-1 focus-within:ring-teal-100"
                              />
                           )}
                        />
                        {errors.skills && (
                        <p className="text-xs text-red-500">
                           {errors.skills.message}
                        </p>
                        )}
                     </div>
                  </FormSection>

                  <FormSection className="p-5 border border-gray-200 space-y-6 rounded-md">
                     <div className="">
                        <div className="flex items-center justify-between py-2">
                           <div>
                              <Label htmlFor="isFeatured" className="text-[0.85rem] font-semibold text-gray-700 leading-tight">Featured Post</Label>
                              <span className="text-xs text-gray-400">
                                 Pin top of career page
                              </span>
                           </div>
                           <Controller
                              name="isFeatured"
                              control={control}
                              render={({ field }) => (
                                 <Switch
                                    id="isFeatured"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-checked:bg-teal-600 cursor-pointer"
                                 />
                              )}
                           />
                        </div>

                        <div className="flex items-center justify-between py-2">
                        <div>
                           <Label htmlFor="isUrgent" className="text-[0.85rem] font-semibold text-gray-700 leading-tight">Urgent Hiring</Label>
                           <span className="text-xs text-gray-400">
                              Adds 'Urgent' badge to listing
                           </span>
                        </div>
                        <Controller
                           name="isUrgent"
                           control={control}
                           render={({ field }) => (
                              <Switch
                                 id="isUrgent"
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                                 className="data-checked:bg-teal-600 cursor-pointer"
                              />
                           )}
                        />
                        </div>
                     </div>
                     <div className="flex items-center justify-between gap-4">
                        <Button
                           type="button"
                           variant="outline"
                           className="flex-1 min-h-11 px-6"
                        >
                           Save Draft
                        </Button>
                        <Button
                           type="submit"
                           disabled={isSubmitting}
                           className="flex-2 min-h-11 bg-teal-600 hover:bg-teal-700"
                        >
                           Publish Job
                        </Button>
                     </div>
                  </FormSection>
               </aside>
            </div>
         </form>
         </div>
      </div>
   );
};

export default Create;
