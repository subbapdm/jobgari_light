import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const MULTI_VALUES_KEYS = ["jobType", "workMode", "experience", "education"] as const;

export interface JobFilters {
   search: string;
   status: string;
   jobType: string;
   workMode: string;
   experience: string;
   education: string;
   category: string;
   location: string;
   company: string;
   salaryMin: string;
   salaryMax: string;
   isFeatured: string;
   isUrgent: string;
   sortBy: string;
   sortOrder: string;
   page: string;
}

const DEFAULT_FILTERS: JobFilters = {
   search: "",
   status: "",
   jobType: "",
   workMode: "",
   experience: "",
   education: "",
   category: "",
   location: "",
   company: "",
   salaryMin: "",
   salaryMax: "",
   isFeatured: "",
   isUrgent: "",
   sortBy: "createdAt",
   sortOrder: "desc",
   page: "1"
};

export function useJobFilters(){
   const [searchParams, setSearchParams] = useSearchParams();

   const filters = useMemo(() => {
      const result = { ...DEFAULT_FILTERS };
      for(const key of Object.keys(DEFAULT_FILTERS) as (keyof JobFilters)[]){
         const value = searchParams.get(key);
         if(value !== null) result[key] = value;
      }
      
      return result;
   }, [searchParams]);

   const setFilter = useCallback((updates: Partial<JobFilters>) => {

      setSearchParams((prev) => {
         const next = new URLSearchParams(prev);

         for(const [key, value] of Object.entries(updates)){
            if(!value || value === "all"){
               next.delete(key);
            } else {
               next.set(key, value);
            }
         }

         if(!("page" in updates)){
            next.set("page", "1");
         }

         return next;
      })
   }, [setSearchParams]);

   const clearFilter = useCallback((key: keyof JobFilters) => {
      setSearchParams((prev) => {
         const next = new URLSearchParams(prev);
         next.delete(key);
         next.set("page", "1");

         return next;
      });
   }, [setSearchParams]);

   const clearAllFilters = useCallback(() => {
      setSearchParams(new URLSearchParams());
   }, [setSearchParams]);

   const toggleMultiValue = useCallback((key: (typeof MULTI_VALUES_KEYS)[number], value: string) => {
      setSearchParams(prev => {
         const next = new URLSearchParams(prev);
         const current = next.get(key)?.split(",").filter(Boolean) ?? [];

         const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

         if(updated.length === 0){
            next.delete(key);
         } else {
            next.set(key, updated.join(","));
         }

         next.set("page", "1");
         return next;
      })
   }, [setSearchParams]);

   const isMultiValueSelected = useCallback((key: (typeof MULTI_VALUES_KEYS)[number], value: string) => {
      return filters[key].split(",").map(s => s.trim()).filter(Boolean).includes(value);
   }, [filters]);

   return { filters, setFilter, clearFilter, clearAllFilters, toggleMultiValue, isMultiValueSelected };
}