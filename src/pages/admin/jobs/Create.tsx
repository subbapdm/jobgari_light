import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const jobSchema = z.object({
   title: z
     .string()
     .min(5, "Job title must be at least 5 characters.")
     .max(32, "Job title must be at most 32 characters."),
   description: z
     .string()
     .min(20, "Job description must be at least 20 characters.")
     .max(100, "Job description must be at most 100 characters."),
 })

const Create = () => {
   const form = useForm<z.infer<typeof jobSchema>>({
      resolver: zodResolver(jobSchema),
      defaultValues: {
        title: "",
        description: "",
      },
   })

   function onSubmit(data: z.infer<typeof jobSchema>) {
      
   }

   return (
      <div className="space-y-4">
         <div>
               <h2 className="text-2xl font-bold text-slate-800">Create Job</h2>
               <p className="text-sm text-slate-400">Publish your new job here</p>
         </div>

         <div className="bg-white rounded-xl">
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
               <>
                  <Label htmlFor="form-rhf-input-username">
                     Username
                  </Label>
                  <Input
                     {...field}
                     id="form-rhf-input-username"
                     aria-invalid={fieldState.invalid}
                     placeholder="shadcn"
                     autoComplete="username"
                  />
               </>
              )}
            />
            </form>
         </div>
      </div>
   )
}

export default Create;