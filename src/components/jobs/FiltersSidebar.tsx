import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { categoryService } from "@/services/categoryService";
import FormSelect from "../form/FormSelect";
import type { JobFilters } from "@/hooks/useJobFilters";
import { useMemo, useState } from "react";
import CheckboxGroup from "../form/CheckboxGroup";
import { JOB_TYPES } from "@/constants/jobEnums";
import { Input } from "../ui/input";


interface FiltersSidebarProps{
   filters: JobFilters;
   setFilter: (updates: Partial<JobFilters>) => void;
   clearAllFilters: () => void;
}

const FiltersSidebar = ({ filters, setFilter, clearAllFilters }: FiltersSidebarProps) => {
   const [salary, setSalary] = useState({
      min: filters.salaryMin,
      max: filters.salaryMax
   });

   const { data: categoriesData } = useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryService.getCategories(),
      staleTime: 5 * 60 * 1000
   });

   const categoryOption = useMemo(() => {
      return categoriesData?.categories.map(cat => ({
         value: cat._id,
         label: cat.name
      })) ?? [];
   }, [categoriesData]);

   const applySalary = () => {
      setFilter({ salaryMin: salary.min, salaryMax: salary.max })
   }

   return (
      <aside className="w-full lg:w-80 bg-white rounded-lg border border-slate-200 p-5 h-fit lg:sticky lg:top-24">
         <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">All Filters</h3>
            <Button type="button" onClick={clearAllFilters} variant="link" className="text-xs text-teal-600 hover:text-teal-700 cursor-pointer rounded-sm">
               Clear All
            </Button>
         </div>

         <div className="space-y-2.5 py-4 border-b border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700">Category</h4>
            <FormSelect
               value={filters.category || ""}
               onChange={(val) => setFilter({ category: val })}
               options={categoryOption}
               className="w-full min-h-11 rounded-sm bg-white"
            />
         </div>

         <CheckboxGroup
            title="Job Type"
            options={JOB_TYPES}
         />

         <div className="space-y-2.5 pt-4">
            <h4 className="text-sm font-semibold text-slate-700">Salary Range</h4>
            <div className="flex items-center gap-2">
               <Input
                  type="number"
                  placeholder="Min"
                  value={salary.min}
                  onChange={(e) => setSalary(prev => ({ ...prev, min: e.target.value }))}
                  className="min-h-10 text-sm"
               />
               <span className="text-slate-300">-</span>
               <Input
                  type="number"
                  placeholder="Max"
                  value={salary.max}
                  onChange={(e) => setSalary(prev => ({ ...prev, max: e.target.value }))}
                  className="min-h-10 text-sm"
               />
            </div>
            <Button
               type="button"
               onClick={applySalary}
               variant="outline"
               className="w-full min-h-11 text-sm bg-teal-600 text-white hover:bg-teal-700 hover:text-white rounded-sm"
            >
               Apply
            </Button>
         </div>
      </aside>
   )
}

export default FiltersSidebar;