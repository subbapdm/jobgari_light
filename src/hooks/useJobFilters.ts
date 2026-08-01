import { ADMIN_DEFAULT_FILTERS, adminJobFilterSchema, type AdminJobFilters } from "@/schemas/jobFilterSchema";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";


const NUMERIC_KEYS = ["salaryMin", "salaryMax"] as const;
const BOOLEAN_KEYS = ["isFeatured", "isUrgent"] as const;

export function useJobFilters(){
   const [searchParams, setSearchParams] = useSearchParams();

   const filters = useMemo(() => {
      const result: Record<string, unknown> = { ...ADMIN_DEFAULT_FILTERS };
      
      for(const key of Object.keys(ADMIN_DEFAULT_FILTERS) as (keyof AdminJobFilters)[]){
         const raw = searchParams.get(key);
         if(raw === null) continue;

         if((NUMERIC_KEYS as readonly string[]).includes(key)){
            result[key] = Number(raw);
         } else if ((BOOLEAN_KEYS as readonly string[]).includes(key)){
            result[key] = raw === "true";
         } else{
            result[key] = raw;
         }
      }
     
      
      return adminJobFilterSchema.parse(result);
   }, [searchParams]);

   const setFilter = useCallback((updates: Partial<AdminJobFilters>) => {

      setSearchParams((prev) => {
         const next = new URLSearchParams(prev);
         
         for(const [key, value] of Object.entries(updates)){
            if(value === null || value === undefined || value === "" || value === "all"){
               next.delete(key);
            } else {
               next.set(key, String(value));
            }
         }

         if(!("page" in updates)){
            next.set("page", "1");
         }

         return next;
      })
   }, [setSearchParams]);

   const clearFilter = useCallback((key: keyof AdminJobFilters) => {
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