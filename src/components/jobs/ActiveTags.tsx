
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import type { AdminJobFilters } from "@/schemas/jobFilterSchema";

interface ActiveTagsProps{
   filters: AdminJobFilters;
   clearFilter: (key: keyof AdminJobFilters) => void;
   clearAllFilters: () => void;
};

type FilterValue = AdminJobFilters[keyof AdminJobFilters];

const FILTER_CONFIG: Partial<Record<keyof AdminJobFilters, { label: string; formatValue?: (val: NonNullable<FilterValue>) => string}>> = {
   keyword: { label: "Keyword" },
   status: { label: "Status", formatValue: (v) => String(v).charAt(0).toUpperCase() + String(v).slice(1) },
   jobType: { label: "Type", formatValue: (v) => String(v).charAt(0).toUpperCase() + String(v).slice(1) },
   workMode: { label: "Work Mode", formatValue: (v) => String(v).charAt(0).toUpperCase() + String(v).slice(1) },
   experience: { label: "Experience", formatValue: (v) => String(v).charAt(0).toUpperCase() + String(v).slice(1) },
   education: { label: "Education", formatValue: (v) => String(v).charAt(0).toUpperCase() + String(v).slice(1) },
   salaryMin: { label: "Min Salary", formatValue: (v) => `$${Number(v).toLocaleString()}` },
   salaryMax: { label: "Max Salary", formatValue: (v) => `$${Number(v).toLocaleString()}` },
   isFeatured: { label: "Featured", formatValue: () => "Yes" },
   isUrgent: { label: "Urgent", formatValue: () => "Yes" }
};

const EXCLUDED_KEYS: (keyof AdminJobFilters)[] = [
   "page",
   "sortBy",
   "sortOrder",
   "category",
   "location",
   "company"
];


const ActiveTags = ({ filters, clearFilter, clearAllFilters }: ActiveTagsProps) => {
   const activeTags = (Object.keys(filters) as (keyof AdminJobFilters)[]).filter(key => filters[key] && !EXCLUDED_KEYS.includes(key));

   return (
      <div className="flex flex-wrap items-center gap-2">
         <span className="text-xs font-medium text-slate-400">Active filters</span>
         {activeTags.map((key) => {
            const config = FILTER_CONFIG[key];
            const label = config?.label || key;
            const rawValue = filters[key];

            if(rawValue === null || rawValue === undefined) return null;

            const displayValue = config?.formatValue ? config.formatValue(rawValue) : String(rawValue);

            return(
               <Badge key={key} className="min-h-7 pl-2.5 pr-1 bg-teal-50 text-teal-700 border border-teal-200/80 font-normal flex items-center gap-1.5 rounded-md hover:bg-teal-100 transition-colors">
                  <span className="text-xs">
                     <strong className="font-semibold text-teal-800">{label}:</strong>{" "}
                     {displayValue}
                  </span>
                  <button type="button" onClick={() => clearFilter(key)} className="rounded p-0.5 text-teal-600 hover:bg-teal-200 hover:text-teal-900 transition-colors cursor-pointer" aria-label={`Remove ${label} filter`}>
                     <X className="size-3" />
                  </button>
               </Badge>
            )
         })}

         {activeTags.length > 1 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs !text-slate-500 hover:text-slate-800 h-7 px-2">
               Clear all
            </Button>
         )}
      </div>
   )
}

export default ActiveTags;