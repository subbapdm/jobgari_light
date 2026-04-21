import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuthStore from "@/store/useAuthStore";

const signinSchema = z.object({
   email: z.email(),
   password: z.string().min(5, "Password must be at least 5 characters.")
});

export type SignInData = z.infer<typeof signinSchema>;

const SignIn = () => {
   const [submitting, setSubmitting] = useState(false);
   const navigate = useNavigate();

   const { SignIn } = useAuthStore();

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(signinSchema),
      defaultValues: {
         email: "",
         password: ""
      }
   })

   const onSubmit = async (data: SignInData) => {
      setSubmitting(true);
      try {
         await SignIn(data);
         toast.success("Signed in successfully");
         navigate("/admin");
      } catch (err) {
         toast.error(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
         setSubmitting(false);
      }
   };

   return (
         <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="min-w-md bg-white p-8 rounded-lg border border-slate-200">
               <div className="mb-5">
                  <h2 className="text-xl font-bold">Sign Up</h2>
                  <p className="text-slate-500 text-sm">Create your account to get started.</p>
               </div>

               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  
                  <div className="space-y-2">
                     <Label htmlFor="email" className="text-sm font-semibold text-slate-600">Email</Label>
                     <Input
                        id="email"
                        {...register("email")}
                        placeholder="your@email.com"
                        className="min-h-12 px-4 focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:border focus-visible:border-gray-200 text-sm text-gray-700 placeholder:text-gray-400"
                     />
                     {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="password" className="text-sm font-semibold text-slate-600">Email</Label>
                     <Input
                        id="password"
                        type="password"
                        {...register("password")}
                        placeholder="Password"
                        className="min-h-12 px-4 focus-visible:ring-1 focus-visible:ring-gray-200 focus-visible:border focus-visible:border-gray-200 text-sm text-gray-700 placeholder:text-gray-400"
                     />
                     {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                  </div>

                  <div>
                     <Button type="submit" className="min-h-12 w-full">
                        {submitting ? "Submiting..." : "Sign In"}
                     </Button>
                  </div>
               </form>
            </div>
         </div>
   )
}

export default SignIn;