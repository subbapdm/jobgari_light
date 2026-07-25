import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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

   return { filters, setFilter, clearFilter, clearAllFilters };
}