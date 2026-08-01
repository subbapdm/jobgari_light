import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type CheckboxOption = string | { label: string; value: string };

interface CheckboxGroupProps{
   title: string;
   options: readonly CheckboxOption[];
   value?: string[];
   onChange: (selected: string[]) => void;
}

function formatLabel(value: string){
   return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
}

const CheckboxGroup = ({ title, options, value = [], onChange }: CheckboxGroupProps) => {
   const handleToggle = (optValue: string, isChecked: boolean) => {
      if(isChecked){
         onChange([ ...value, optValue ]);
      } else {
         onChange(value.filter(item => item !== optValue));
      }
   }
   return (
      <div className="space-y-2.5 py-4 border-b border-slate-100">
         <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
         <div className="space-y-2">
            {options.map((opt) => {
               const optValue = typeof opt === "string" ? opt : opt.value;

               const optLabel = typeof opt === "string" ? formatLabel(opt) : opt.label || formatLabel(opt.value);

               return(
                  <Label key={optLabel} htmlFor={optLabel} className="flex items-center gap-2.5 text-sm text-slate-500 cursor-pointer">
                     <Checkbox
                        id={optLabel}
                        checked={value.includes(optValue)}
                        onCheckedChange={(checked) => handleToggle(optValue, Boolean(checked))}
                        className="size-5 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 cursor-pointer"
                     />
                     {optLabel}
                  </Label>
               )
            })}
         </div>
      </div>
   )
}

export default CheckboxGroup;