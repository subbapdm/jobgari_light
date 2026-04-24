import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

type FormRadioGroupProps<T extends FieldValues> = {
   control: Control<T>;
   name: Path<T>;
   size?: string;
   options: {
      value: string;
      label: string;
   }[];
}

const FormRadioGroup = <T extends FieldValues>({ control, size, name, options }: FormRadioGroupProps<T>) => {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} value={field.value} className={cn("grid grid-cols-1 gap-3", size === "sm" ? "grid-cols-2" : "grid-cols-2")}>

               {options.map(({ value, label }) => (
                  <div key={value} className="flex-1">
                     <RadioGroupItem value={value} id={value} className="hidden" />
                     <Label htmlFor={value} className={cn("flex items-center border-1 border-gray-200 rounded-md cursor-pointer transition-all peer-data-[state=checked]:bg-teal-50/50 peer-data-[state=checked]:border-teal-500", size === 'sm' ? "p-3" : "p-4")}>

                        <div className="size-4 rounded-full border-1 border-gray-300 flex items-center justify-center peer-data-[state=checked]:bg-teal-600 shrink-0">
                           {field.value === value && (
                              <div className="size-2 rounded-full bg-teal-500" />
                           )}
                        </div>

                        <span className={cn("text-[0.8rem] text-slate-700 font-medium", field.value === value && "text-teal-600")}>{label}</span>
                     </Label>
                  </div>
               ))}

            </RadioGroup>
         )}
      />
   )
}

export default FormRadioGroup;