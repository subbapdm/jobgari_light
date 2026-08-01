import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Label } from "../ui/label";
import FormSelect from "../form/FormSelect";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import type { AdminJobFilters } from "@/schemas/jobFilterSchema";


const EXPERIENCE_OPTIONS = [
   { value: "all", label: "All Experience" },
   { value: "entry", label: "Entry" },
   { value: "junior", label: "Junior" },
   { value: "mid", label: "Mid" },
   { value: "senior", label: "Senior" },
   { value: "lead", label: "Lead" },
   { value: "executive", label: "Executive" }
];

const WORK_MODE_OPTIONS = [
   { value: "all", label: "All Work Modes" },
   { value: "remote", label: "Remote" },
   { value: "onsite", label: "Onsite" },
   { value: "hybrid", label: "Hybrid" }
];

const EDUCATION_OPTIONS = [
   { value: "all", label: "All Education" },
   { value: "high-school", label: "High School" },
   { value: "bachelor", label: "Bachelor" },
   { value: "master", label: "Master" },
   { value: "phd", label: "PhD" },
   { value: "none", label: "None" }
];

interface AdvanceFilterDropdownProps{
   filters: AdminJobFilters;
   setFilter: (updates: Partial<AdminJobFilters>) => void;
   activeCount: number;
   clearAllFilters: () => void
}

const AdvanceFilterDropdown = ({ filters, setFilter, activeCount, clearAllFilters }: AdvanceFilterDropdownProps) => {
   const [open, setOpen] = useState(false);

   const [draftFilters, setDraftFilters] = useState<AdminJobFilters>(filters);

   useEffect(() => {
      if(open){
         setDraftFilters(filters);
      }
   }, [filters, open]);

   const updateDraft = (updates: Partial<AdminJobFilters>) => {
      setDraftFilters(prev => ({ ...prev, ...updates }));
   }

   const handleApply = () => {
      setFilter(draftFilters);
      setOpen(false);
   }

   const handleReset = () => {
      clearAllFilters();
      setOpen(false);
   }

   return (
      <Popover open={open}>
         <PopoverTrigger asChild>
            <Button onClick={() => setOpen(prev => !prev)} variant="outline" className="min-h-11 bg-white rounded-sm cursor-pointer px-4 relative">
               <SlidersHorizontal className="size-4" />
               {activeCount > 0 && (
                  <span className="absolute -top-2 -right-2 size-5 flex items-center justify-center rounded-full bg-teal-600 text-white text-[0.7rem] font-semibold">
                     {activeCount}
                  </span>
               )}
            </Button>
         </PopoverTrigger>

         <PopoverContent align="end" className="w-80 p-4 space-y-4">
            <div className="space-y-2">
               <Label className="text-[0.8rem] font-semibold text-gray-700">Experience</Label>
               <FormSelect
                  value={draftFilters.experience || "all"}
                  onChange={(val) => updateDraft({ experience: val === "all" ? "" : val })}
                  options={EXPERIENCE_OPTIONS}
                  placeholder="All Experience"
                  className="min-h-10 w-full rounded-sm"
               />
            </div>
            <div className="space-y-2">
               <Label className="text-[0.8rem] font-semibold text-gray-700">Work Mode</Label>
               <FormSelect
                  value={draftFilters.workMode || "all"}
                  onChange={(val) => updateDraft({ workMode: val === "all" ? "" : val })}
                  options={WORK_MODE_OPTIONS}
                  placeholder="All Work Modes"
                  className="min-h-10 w-full rounded-sm"
               />
            </div>
            <div className="space-y-2">
               <Label className="text-[0.8rem] font-semibold text-gray-700">Education</Label>
               <FormSelect
                  value={draftFilters.education || "all"}
                  onChange={(val) => updateDraft({ education: val === "all" ? "" : val })}
                  options={EDUCATION_OPTIONS}
                  placeholder="All Education"
                  className="min-h-10 w-full rounded-sm"
               />
            </div>
            <div className="space-y-2">
               <Label className="text-[0.8rem] font-semibold text-gray-700">Salary Range</Label>
               <div className="flex items-center gap-2">
                  <Input
                     type="number"
                     value={draftFilters.salaryMin ?? ""}
                     onChange={(e) => updateDraft({ salaryMin: e.target.value ? Number(e.target.value) : null  })}
                     placeholder="Min"
                     className="min-h-10 rounded-sm"
                  />
                  <span className="text-gray-400">-</span>
                  <Input
                     type="number"
                     value={draftFilters.salaryMax ?? ""}
                     onChange={(e) => updateDraft({ salaryMax: e.target.value ? Number(e.target.value) : null })}
                     placeholder="Max"
                     className="min-h-10 rounded-sm"
                  />
               </div>
            </div>

            <div className="flex items-center justify-between py-1">
               <Label className="text-[0.8rem] font-semibold text-gray-700">Featured only</Label>
               <Switch
                  checked={draftFilters.isFeatured || undefined}
                  onCheckedChange={(checked) => updateDraft({ isFeatured: checked })}
                  className="data-checked:bg-teal-600 cursor-pointer"
               />
            </div>
            <div className="flex items-center justify-between py-1">
               <Label className="text-[0.8rem] font-semibold text-gray-700">Urgent only</Label>
               <Switch
                  checked={draftFilters.isUrgent || undefined}
                  onCheckedChange={(checked) => updateDraft({ isUrgent: checked })}
                  className="data-checked:bg-teal-600 cursor-pointer"
               />
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
               <Button
                  type="button"
                  variant="outline"
                  onClick={clearAllFilters}
                  className="flex-1 min-h-10"
               >Reset</Button>
               <Button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 min-h-10 bg-teal-600 hover:bg-teal-700"
               >Apply</Button>
            </div>
         </PopoverContent>
      </Popover>
   );
};

export default AdvanceFilterDropdown;