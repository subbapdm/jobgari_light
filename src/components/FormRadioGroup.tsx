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
                  <div key={value} className="flex items-center space-x-2 p-4 border border-gray-200 rounded-md flex-1">
                     <RadioGroupItem value={value} id={value} />
                     <Label htmlFor={value} className="text-slate-700">{label}</Label>
                  </div>
               ))}
            </RadioGroup>
         )}
      />
   )
}

export default FormRadioGroup;