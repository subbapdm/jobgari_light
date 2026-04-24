import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

type FormRadioTabProps<T extends FieldValues> = {
   control: Control<T>;
   name: Path<T>;
   options: {
      value: string;
      label: string;
   }[];
}

const FormRadioTab = <T extends FieldValues>({ control, name, options }: FormRadioTabProps<T>) => {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex items-center justify-between bg-slate-100 p-1.5 rounded-md">

               {options.map(({ value, label }) => (
                  <div key={value} className="flex-1">
                     <RadioGroupItem value={value} id={value} className="hidden" />
                     <Label htmlFor={value} className={cn("flex items-center justify-center rounded-sm cursor-pointer transition-all peer-data-[state=checked]:bg-white peer-data-[state=checked]:border-teal-500 p-3.5")}>
                        <span className={cn("text-[0.8rem] text-slate-500 font-semibold", field.value === value && "text-teal-600")}>{label}</span>
                     </Label>
                  </div>
               ))}

            </RadioGroup>
         )}
      />
   )
}

export default FormRadioTab;