import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface FormSelectProps{
   value: string;
   onChange: (value: string) => void;
   options: {
      value: string;
      label: string;
   }[];
   placeholder?: string;
   label?: string;
   id?: string;
   disabled?: boolean;
   className?: string;
   isLoading?: boolean;
}

const FormSelect = ({ value, onChange, options, placeholder = "Select an option", label, id, disabled, isLoading = false, className }: FormSelectProps) => {
   return (
      <Select onValueChange={onChange} value={value} disabled={disabled}>
         <SelectTrigger id={id} className={cn("w-full min-h-11 cursor-pointer", className ?? "")}>
            <SelectValue placeholder={isLoading ? "Loading..." : placeholder} />
         </SelectTrigger>
         <SelectContent
            position="popper"
            className="w-[var(--radix-select-trigger-width)]"
         >
            <SelectGroup className="p-2 space-y-1">
               {label && <SelectLabel className="py-3 py-2.5 text-sm">{label}</SelectLabel>}
               {options.map((option) => (
                  <SelectItem 
                     key={option.value} 
                     value={option.value} 
                     className="p-2 text-gray-700 font-medium cursor-pointer transition-color duration-200 data-[highlighted]:bg-teal-100 data-[highlighted]:[&_span]:text-teal-700 data-[state=checked]:bg-teal-100 data-[state=checked]:text-teal-700">
                        {option.label}
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   )
}

export default FormSelect