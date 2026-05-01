import { useMemo, useState, type KeyboardEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkle, X } from "lucide-react";
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



const jobSchema = z.object({
   title: z.string().min(5, "Title must be at least 5 characters.").max(100, "Title must be at most 100 characters"),
   description: z.string().min(20, "Description must be at least 20 characters."),
   category: z.string().min(1, "Category is required."),
   deadline: z.date(),
   company: z.string().min(1, "Company is required."),
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

   const [openDate, setOpenDate] = useState(false)

   const { data: companiesData, isLoading: loadingCompanies } = useQuery({
      queryKey: ["companies"],
      queryFn: () => companyService.getCompanies(),
      staleTime: 5 * 60 * 1000
   })

   const { data: categoriesData, isLoading:  loadingCategories } = useQuery({
      queryKey: ['categories'],
      queryFn: () => categoryService.getCategories(),
      staleTime: 5 * 60 * 1000
   });

   const { data: locationsData, isLoading: loadingLocations } = useQuery({
      queryKey: ["locations"],
      queryFn: () => locationService.getLocations(),
      staleTime: 5 * 60 * 1000
   });

   
   // Test locationOptions without useMemo
   /* const locationOptions = locationsData?.locations.map((l) => { 
      console.log("locations recomputed");
      return {
         value: l._id,
         label: l.city
      }
   }) ?? [];
   */

   // Test locationOptions with useMemo
   /* const locationOptions = useMemo(() => {
      console.log("locations recomputed");
      return locationsData?.locations.map((l) => ({
         value: l._id,
         label: l.city
      }))
   }, [locationsData]);
   */

   const locationOptions = useMemo(() => {
      return locationsData?.locations.map((l) => ({
         value: l._id,
         label: l.city
      })) ?? [];
   }, [locationsData]);

   const categoryOptions = useMemo(() => {
      return categoriesData?.categories.map((c) => ({
         value: c._id,
         label: c.name
      })) ?? [];
   }, [categoriesData]);

   const companyOptions = useMemo(() => {
      return companiesData?.companies?.map((c) => ({
         value: c._id,
         label: c.name
      })) ?? [];
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
         company: "",
         description: "",
         category: "",
         deadline: undefined,
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
        <p className="text-sm text-slate-400">Fill in the details to publish new open position.</p>
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
                  
                  <FormSection>
                     <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-700">
                           Job Title
                        </Label>
                        <Input
                           id="title"
                           placeholder="e.g. Frontent Developer"
                           {...register("title")}
                           className="min-h-11 rounded-md focus-visible:border focus-visible:border-teal-200 focus-visible:ring-1 focus-visible:ring-teal-200"
                        />
                        {errors.title && (
                           <p className="text-xs text-red-500">{errors.title.message}</p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-700">
                           Slug
                        </Label>
                        <Input
                           id="title"
                           placeholder="e.g. Frontent Developer"
                           {...register("title")}
                           className="min-h-11 rounded-md focus-visible:border focus-visible:border-teal-200 focus-visible:ring-1 focus-visible:ring-teal-200"
                        />
                        {errors.title && (
                           <p className="text-xs text-red-500">{errors.title.message}</p>
                        )}
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="company">Company</Label>
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
                                    className="rounded-md focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
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
                           <Label htmlFor="deadline">Dealine</Label>
                           <Controller
                              name="deadline"
                              control={control}
                              render={({ field }) => (
                                 <FormDate
                                    value={field.value}
                                    onChange={field.onChange}
                                    startYear={getYear(new Date())}
                                    endYear={getYear(new Date()) + 5}
                                    className="min-h-11 text-gray-500 font-normal rounded-md"
                                 />
                              )}
                           />
                           {errors.deadline && (
                              <p className="text-xs text-red-500">
                                 {errors.deadline.message}
                              </p>
                           )}
                        </div>
                     </div>
                  </FormSection>

                  <FormSection
                     title="Job description"
                     subtitle="Describe the role and what you're looking for"
                     icon={Sparkle}
                     button={<Button type="button" className="text-xs text-teal-700 min-h-9 bg-teal-100"><Sparkle/><span>Generate with AI</span></Button>}
                  >
                     <div className="space-y-2">
                        <Label htmlFor="description" className="peer sr-only">Description</Label>
                        <Controller
                           name="description"
                           control={control}
                           render={({ field }) => (
                              <TextEditor
                                 value={field.value}
                                 onChange={field.onChange}
                                 placeholder="Describe the role, responsibilities, requirements..."
                              />
                           )} 
                        />
                     </div>
                  </FormSection>

                  <FormSection>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="category">Category</Label>
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
                                    className="rounded-md focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
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
                           <Label htmlFor="location">Location</Label>
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
                                    className="rounded-md focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
                                 />
                              )}
                           />
                           {errors.location && (
                              <p className="text-xs text-red-500">
                                 {errors.location.message}
                              </p>
                           )}
                        </div>
                     </div>
                  </FormSection>

               </div>
               
               {/* RIGHT */}
               <aside className="xl:sticky xl:top-28 xl:self-start space-y-6">

                  <FormSection>
                     <div className="space-y-2">
                        <Label htmlFor="jobType">Job Type</Label>
                        
                        <FormRadioGroup 
                           control={control}
                           name="jobType"
                           size="sm"
                           options={[
                              { value: "full-time", label: "Full-Time"},
                              { value: "part-time", label: "Part-Time"},
                              { value: "contract", label: "Contract"},
                              { value: "internship", label: "Internship"}
                           ]}
                        />

                        {errors.jobType && (
                           <p className="text-xs text-red-500">
                              {errors.jobType.message}
                           </p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="workMode">Work Mode</Label>

                        <FormRadioTab 
                           control={control}
                           name="workMode"
                           options={[
                              { value: "remote", label: "Remote"},
                              { value: "hybrid", label: "Hybrid"},
                              { value: "onsite", label: "Onsite"},
                           ]}
                        />
                        {errors.location && (
                           <p className="text-xs text-red-500">
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
                              <FormSelect
                                 value={field.value}
                                 onChange={field.onChange}
                                 options={[
                                    { value: "entry", label: "Entry"},
                                    { value: "junior", label: "Junior"},
                                    { value: "mid", label: "Mid"},
                                    { value: "senior", label: "Senior"},
                                    { value: "lead", label: "Lead"},
                                    { value: "executive", label: "Executive"}
                                 ]}
                                 placeholder="Select experience"
                                 label="Experience"
                                 id="experience"
                                 className="rounded-md focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
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
                        <Label htmlFor="education">Education</Label>
                        <Controller
                           name="education"
                           control={control}
                           render={({ field }) => (
                              <FormSelect
                                 value={field.value}
                                 onChange={field.onChange}
                                 options={[
                                    { value: "high-school", label: "High-school"},
                                    { value: "bachelor", label: "Bachelor"},
                                    { value: "master", label: "Master"},
                                    { value: "phd", label: "Phd"},
                                    { value: "none", label: "None"}
                                 ]}
                                 placeholder="Select education"
                                 label="Education"
                                 id="education"
                                 className="rounded-md focus-visible:border focus-visible:border-teal-100 focus-visible:ring-1 focus-visible:ring-teal-100"
                              />
                           )}
                        />
                        {errors.education && (
                           <p className="text-xs text-red-500">
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
                           className="min-h-11"
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
                           <p className="text-xs text-red-500">
                              {errors.experience.message}
                           </p>
                        )}
                     </div>
                  </FormSection>

                  <FormSection>
                     <div className="">
                        <div className="flex items-center justify-between py-2">
                           <div>
                              <Label htmlFor="airplane-mode">Featured Post</Label>
                              <span className="text-xs text-gray-400">Pin top of career page</span>
                           </div>
                           <Switch id="airplane-mode" className="data-checked:bg-teal-600" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between py-2">
                           <div>
                              <Label htmlFor="airplane-mode">Urgent Hiring</Label>
                              <span className="text-xs text-gray-400">Adds 'Urgent' badge to listing</span>
                           </div>
                           <Switch id="airplane-mode" className="data-checked:bg-teal-600" />
                        </div>
                     </div>
                     <div className="flex items-center justify-between">
                        <Button type="submit" variant="outline" className="min-h-12 px-6">
                           Save Draft
                        </Button>
                        <Button type="submit" className="min-h-12 min-w-1/2 bg-teal-600 hover:bg-teal-700">
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
