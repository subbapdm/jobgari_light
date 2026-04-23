import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type FormRadioGroupProps<T extends FieldValues> = {
   control: Control<T>;
   name: Path<T>;
   options: {
      value: string;
      label: string;
   }[];
}

const FormRadioGroup = <T extends FieldValues>({ control, name, options }: FormRadioGroupProps<T>) => {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex items-center justify-between gap-8">

               {options.map(({ value, label }) => (
                  <div key={value} className="flex-1">
                     <RadioGroupItem value={value} id={value} className="peer sr-only" />
                     <Label htmlFor={value} className="flex items-center p-4 border-2 border-gray-200 rounded-md cursor-pointer transition-all peer-data-[state=checked]:bg-teal-600 peer-data-[state=checked]:bg-teal-50/50 peer-data-[state=checked]:border-teal-500">

                        <div className="size-5 rounded-full border-2 border-gray-300 flex items-center justify-center peer-data-[state=checked]:bg-teal-600">
                           {field.value === value && (
                              <div className="size-3 rounded-full bg-teal-500" />
                           )}
                        </div>

                        <span className="text-slate-700 font-medium">{label}</span>
                     </Label>
                  </div>
               ))}

            </RadioGroup>
         )}
      />
   )
}

export default FormRadioGroup;