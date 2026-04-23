import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

import FormRadioGroup from "@/components/FormRadioGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";

const signupSchema = z.object({
   name: z
      .string()
      .min(2, "Name must be at least 2 characters."),
   email: z
      .email(),
   password: z
      .string()
      .min(5, "Password must be at least 5 characters."),
   role: z.enum(["jobseeker", "employer"])
});

export type SignUpData = z.infer<typeof signupSchema>

const SignUp = () => {
   const [submitting, setSubmitting] = useState(false);
   const navigate = useNavigate();
   const { SignUp } = useAuthStore();

   const { register, control, handleSubmit, formState: { errors }} = useForm<SignUpData>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         role: "jobseeker"
      }
   });

   const onSubmit = async (data: SignUpData) => {
      setSubmitting(true);

      try {
         await SignUp(data);
         toast.success("Signup successfully!");
         navigate("/sign-in");
      } catch (err) {
         toast.error("Something went wrong. Please try again.");
      } finally {
         setSubmitting(false);
      }
   }

   return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
         <div className="min-w-md bg-white p-8 rounded-lg border border-slate-200">
            <div className="mb-5 space-y-1">
               <h2 className="text-xl font-bold">Sign Up</h2>
               <p className="text-slate-500 text-sm">Create your account to get started.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               
               <div className="space-y-2">
                  <Label htmlFor="name" className="text-[0.8rem] font-semibold text-slate-600">Full Name</Label>
                  <Input
                     id="name"
                     {...register("name")}
                     placeholder="John Doe"
                     className="min-h-12 px-4 focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:border focus-visible:border-gray-200 text-sm text-gray-700 placeholder:text-gray-400"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="email" className="text-[0.8rem] font-semibold text-slate-600">Email</Label>
                  <Input
                     id="email"
                     {...register("email")}
                     placeholder="your@email.com"
                     className="min-h-12 px-4 focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:border focus-visible:border-gray-200 text-sm text-gray-700 placeholder:text-gray-400"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
               </div>
               <div className="space-y-2">
                  <Label htmlFor="password" className="text-[0.8rem] font-semibold text-slate-600">Email</Label>
                  <Input
                     id="password"
                     type="password"
                     {...register("password")}
                     placeholder="Password"
                     className="min-h-12 px-4 focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:border focus-visible:border-gray-200 text-sm text-gray-700 placeholder:text-gray-400"
                  />
                  {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
               </div>
               <div className="space-y-2">
                  <Label className="text-[0.8rem] font-semibold text-slate-600">I am a...</Label>
                  <FormRadioGroup
                     control={control}
                     name="role"
                     options={[
                        { value: "jobseeker", label: "Job seeker" },
                        { value: "employer", label: "Employer" }
                     ]}
                  />
                  {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
               </div>

               <div className="space-y-4">
                     <Button type="submit" className="min-h-12 w-full bg-teal-600 hover:bg-teal-700">
                        {submitting ? "Submiting..." : "Sign Up"}
                     </Button>

                     <p className="text-sm text-gray-500">Already have an account? <Link to="/sign-in" className="text-teal-500">Sign In</Link></p>
                  </div>
            </form>
         </div>
      </div>
   )
}

export default SignUp;