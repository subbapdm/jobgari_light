import { Check, type LucideIcon } from "lucide-react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type FormRadioTabProps<T extends FieldValues> = {
   control: Control<T>;
   name: Path<T>;
   options: {
      value: string;
      label: string;
      icon: LucideIcon;
   }[];
   className?: string;
}

const FormRadioTab = <T extends FieldValues>({ control, name, options, className }: FormRadioTabProps<T>) => {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} value={field.value} className={cn("grid grid-cols-3 gap-2", className)}>
               {options.map(({ value, label, icon: Icon }) => {
                  const isSelected = field.value === value;
                  return(
                     <div key={value}>
                        <RadioGroupItem value={value} id={`${name}-${value}`} className="sr-only absolute" />
                        <Label
                           htmlFor={`${name}-${value}`}
                           className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[0.85rem] font-medium cursor-pointer transition-all duration-200", isSelected ? "border-teal-500 bg-teal-500 text-white shadow-sm" : "border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600")}>
                              {isSelected ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
                              {label}
                           </Label>
                     </div>
                  )
               })}

            </RadioGroup>
         )}
      />
   )
}

export default FormRadioTab;