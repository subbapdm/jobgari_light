import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import FormSelect from "./FormSelect";

export type SalaryValue = {
   min?: number;
   max?: number;
   currency: "USD" | "EUR" | "GBP";
   period: "hourly" | "monthly" | "annually";
   undisclosed: boolean;
};

const DEFAULT_SALARY: SalaryValue = {
   currency: "USD",
   period: "annually",
   undisclosed: false
};

const CURRENCY_OPTIONS = [
   { value: "USD", label: "USD $" },
   { value: "EUR", label: "EUR €" },
   { value: "GBP", label: "GBP £" },
];

const PERIOD_OPTIONS = [
   { value: "hourly", label: "/ hour" },
   { value: "monthly", label: "/ month" },
   { value: "annually", label: "/ year" }
]

const SYMBOL: Record<SalaryValue["currency"], string> = {
   USD: "$", EUR: "€", GBP: "£"
}

interface SalaryInputProps {
   value?: SalaryValue;
   onChange: (value: SalaryValue) => void;
   className?: string;
}

const SalaryInput = ({ value = DEFAULT_SALARY, onChange, className }: SalaryInputProps) => {
   const patch = (partial: Partial<SalaryValue>) => onChange({ ...value, ...partial });

   return (
      <div className="space-y-3">
         <div className="flex items-center justify-between">
            <Label className="text-[0.85rem] font-semibold text-gray-700">Salary Range</Label>
            <div className="flex items-center gap-2">
               <span className="text-xs text-gray-400">Undisclosed</span>
               <Switch
                  checked={value.undisclosed}
                  onCheckedChange={(checked) => patch({ undisclosed: checked })}
                  className="data-checked:bg-teal-600 cursor-pointer"
               />
            </div>
         </div>

         <div className="grid grid-cols-2 gap-2">
            <FormSelect
               value={value.currency}
               onChange={(v) => patch({ currency: v as SalaryValue["currency"] })}
               options={CURRENCY_OPTIONS}
               label="Currency"
               placeholder="Currency"
               className={cn("text-sm", className)}
            />
            <FormSelect
               value={value.period}
               onChange={(v) => patch({ period: v as SalaryValue["period"] })}
               options={PERIOD_OPTIONS}
               label="Period"
               placeholder="Period"
               className={cn("text-sm", className)}
            />
         </div>

         <div className={`grid grid-cols-2 gap-2 transition-opacity duration-200 ${value.undisclosed ? "opacity-40 pointer-events-none select-none" : ""}`}>
            {(["min", "max"] as const).map((key) => (
               <div key={key} className="space-y-1">
                  <Label className="text-xs text-gray-500 capitalize">{key}imum</Label>
                  <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {SYMBOL[value.currency]}
                     </span>
                     <Input
                        type="number"
                        min={0}
                        value={value[key] ?? ""}
                        onChange={(e) => patch({ [key]: e.target.value === "" ? undefined : Number(e.target.value ) })}
                        className={cn("pl-7 text-sm focus-visible:border-teal-200 focus-visible:ring-1 focus-visible:ring-teal-200", className)}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default SalaryInput;