import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface CheckboxGroupProps{
   title: string;
   options: readonly string[];
}

const CheckboxGroup = ({ title, options }: CheckboxGroupProps) => {
   return (
      <div className="space-y-2.5 py-4 border-b border-slate-100">
         <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
         <div className="space-y-2">
            {options.map((opt) => (
               <Label key={opt} htmlFor="" className="flex items-center gap-2.5 text-sm text-slate-500 cursor-pointer">
                  <Checkbox
                     id={``}
                     checked
                     onCheckedChange={() => {}}
                     className="size-5 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                  />
                  {opt}
               </Label>
            ))}
         </div>
      </div>
   )
}

export default CheckboxGroup;