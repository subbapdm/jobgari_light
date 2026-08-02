import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { categoryService } from "@/services/categoryService";
import FormSelect from "../form/FormSelect";

import { useCallback, useMemo, useState } from "react";
import CheckboxGroup from "../form/CheckboxGroup";
import { EDUCATION_LEVELS, EXPERIENCE_LEVELS, JOB_TYPES, WORK_MODES } from "@/constants/jobEnums";
import { Input } from "../ui/input";
import type { PublicJobFilters } from "@/schemas/jobFilterSchema";
import { ListFilter } from "lucide-react";
import { locationService } from "@/services/locationService";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";



interface FiltersSidebarProps{
   filters: PublicJobFilters;
   onChange: (filters: Partial<PublicJobFilters>) => void;
   onClear: () => void;
}


const FiltersSidebar = ({ filters, onChange, onClear }: FiltersSidebarProps) => {
   const [keyword, setKeyword] = useState(filters.keyword);

   const [salary, setSalary] = useState<{ min: number | null; max: number | null }>({
      min: filters.salaryMin,
      max: filters.salaryMax
   });

   const { data: categoriesData } = useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryService.getCategories(),
      staleTime: 5 * 60 * 1000
   });

   const { data: locationData } = useQuery({
      queryKey: ["locations"],
      queryFn: () => locationService.getLocations(),
      staleTime: 5 * 60 * 1000
   });

   const categoryOptions = useMemo(() => {
      return categoriesData?.categories.map(cat => ({
         value: cat._id,
         label: cat.name
      })) ?? [];
   }, [categoriesData]);

   const locationOptions = useMemo(() => {
      return locationData?.locations.map(loc => ({
         value: loc._id,
         label: loc.city
      })) ?? []
   }, [locationData])

   const handleApplySalary = useCallback(() => {
      onChange({
         salaryMin: salary.min ? salary.min : null,
         salaryMax: salary.max ? salary.max : null
      })
   }, [salary, onChange]);

   const { page, sortBy, sortOrder, status, ...filtersRest} = filters;
   const activeCount = Object.values(filtersRest).reduce<number>((acc, val) => 
      acc + (Array.isArray(val) ? val.length : val != null && val !== "" ? 1 : 0), 0
   );

   return (
      <aside className="w-full lg:w-80 bg-white rounded-lg p-5 h-fit lg:sticky lg:top-24 border border-slate-100">
         <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
               <ListFilter size={16} />
               <h3 className="text-xs md:text-sm font-semibold text-slate-800">Filters ({activeCount})</h3>
            </div>
            <Button type="button" onClick={onClear} variant="link" className="text-[0.75rem] text-teal-600 font-semibold hover:text-teal-700 cursor-pointer rounded-sm hover:no-underline">
               Clear All
            </Button>
         </div>

         <div className="space-y-2.5 py-4 border-b border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700">Location</h4>
            <FormSelect
               value={filters.location || ""}
               onChange={(val) => onChange({ location: val })}
               options={locationOptions}
               className="w-full min-h-11 rounded-sm bg-white"
            />
         </div>

         <div className="flex items-center justify-between space-y-2.5 py-4 border-b border-slate-100">
            <Label className="text-[0.8rem] font-semibold text-gray-700">Urgent only</Label>
            <Switch
               checked={filters.isUrgent || undefined}
               onCheckedChange={(checked) => onChange({ isUrgent: checked })}
               className="data-checked:bg-teal-600 cursor-pointer"
            />
         </div>

         <div className="space-y-2.5 py-4 border-b border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700">Category</h4>
            <FormSelect
               value={filters.category || ""}
               onChange={(val) => onChange({ category: val })}
               options={categoryOptions}
               className="w-full min-h-11 rounded-sm bg-white"
            />
         </div>

         <CheckboxGroup
            title="Work Type"
            options={JOB_TYPES}
            value={filters.jobType}
            onChange={(selected) => onChange({ jobType: selected })}
         />

         <CheckboxGroup
            title="Experience"
            options={EXPERIENCE_LEVELS}
            value={filters.experience}
            onChange={(selected) => onChange({ experience: selected })}
         />

         <CheckboxGroup
            title="Work Mode"
            options={WORK_MODES}
            value={filters.workMode}
            onChange={(selected) => onChange({ workMode: selected })}
         />

         <CheckboxGroup
            title="Education"
            options={EDUCATION_LEVELS}
            value={filters.education}
            onChange={(selected) => onChange({ education: selected })}
         />

         <div className="space-y-2.5 pt-4">
            <h4 className="text-sm font-semibold text-slate-700">Salary Range</h4>
            <div className="flex items-center gap-2">
               <Input
                  type="number"
                  placeholder="Min"
                  value={salary.min ?? ""}
                  onChange={(e) => setSalary(prev => ({ 
                     ...prev, 
                     min: e.target.value === "" ? null : Number(e.target.value)
                  }))}
                  className="min-h-10 text-sm"
               />
               <span className="text-slate-300">-</span>
               <Input
                  type="number"
                  placeholder="Max"
                  value={salary.max ?? ""}
                  onChange={(e) => setSalary(prev => ({ 
                     ...prev, 
                     max: e.target.value === "" ? null : Number(e.target.value)
                  }))}
                  className="min-h-10 text-sm"
               />
            </div>
            <Button
               type="button"
               onClick={handleApplySalary}
               variant="outline"
               className="w-full min-h-11 text-sm bg-teal-600 text-white hover:bg-teal-700 hover:text-white rounded-sm mt-2"
            >
               Apply Salary
            </Button>
         </div>
         
      </aside>
   )
}

export default FiltersSidebar;