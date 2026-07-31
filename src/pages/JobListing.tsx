import Container from '@/components/Container';
import FiltersSidebar from '@/components/jobs/FiltersSidebar';
import { jobsService } from '@/services/jobService';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface FilterState{
   keyword: string;
   location: string;
   status: string;
   jobType: string[];
   workMode: string[];
   experience: string[];
   education: string[];
   category: string;
   company: string;
   salaryMin: number | null;
   salaryMax: number | null;
   isFeatured: boolean | null;
   isUrgent: boolean | null;

   sortBy: string;
   sortOrder: string;
   page: string;
};

export const INITIAL_FILTERS: FilterState = {
   keyword: "",
   location: "",
   status: "",
   jobType: [],
   workMode: [],
   experience: [],
   education: [],
   category: "",
   company: "",
   salaryMin: null,
   salaryMax: null,
   isFeatured: null,
   isUrgent: null,

   sortBy: "createdAt",
   sortOrder: "desc",
   page: "1"
};

const getArrayParam = (paramValue: string | null): string[] => {
   if(!paramValue) return [];
   return paramValue.split(",").filter(Boolean);;
};

const JobListing = () => {
   const [ searchParams, setSearchParams ] = useSearchParams();

   const filters: FilterState = useMemo(() => {
      return {
         keyword: searchParams.get("keyword") ?? INITIAL_FILTERS.keyword,
         location: searchParams.get("location") ?? INITIAL_FILTERS.location,
         status: searchParams.get("status") ?? INITIAL_FILTERS.status,

         jobType: getArrayParam(searchParams.get("jobType")),
         workMode: getArrayParam(searchParams.get("workMode")),
         experience: getArrayParam(searchParams.get("experience")),
         education: getArrayParam(searchParams.get("education")),

         category: searchParams.get("category") ?? INITIAL_FILTERS.category,
         company: searchParams.get("company") ?? INITIAL_FILTERS.company,
         salaryMin: searchParams.get("salaryMin") ? Number(searchParams.get("salaryMin")) : null,
         salaryMax: searchParams.get("salaryMax") ? Number(searchParams.get("salaryMax")) : null,
         isFeatured: searchParams.get("isFeatured") === "true",
         isUrgent: searchParams.get("isUrgent") === "true",

         sortBy: searchParams.get("sortBy") ?? INITIAL_FILTERS.sortBy,
         sortOrder: searchParams.get("sortOrder") ?? INITIAL_FILTERS.sortOrder,
         page: searchParams.get("page") ?? INITIAL_FILTERS.page
      };
   }, [searchParams]);

   const setFilters = useCallback((newFilters: Partial<FilterState>) => {
      const merged = { ...filters, ...newFilters };

      if(!('page' in newFilters)){
         merged.page = INITIAL_FILTERS.page;
      }

      const params = new URLSearchParams();

      (Object.keys(merged) as Array<keyof FilterState>).forEach((key) => {
         const value = merged[key];
         const defaultValue = INITIAL_FILTERS[key];

         if(value === null || value === undefined) return;

         if(Array.isArray(value)){
            if(value.length > 0){
               // Join array values into a single comma-separated string
               params.set(key, value.join(","));
            }
         } else if (value !== defaultValue){
            params.set(key, String(value));
         }
      });

      setSearchParams(params, { replace: true });
   }, [filters, setSearchParams]);


   const clearFilters = useCallback(() => {
      setSearchParams({}, { replace: true });
   }, [setSearchParams]);


   const { data } = useQuery({
      queryKey: ["jobs", filters],
      queryFn: () => jobsService.getJobs(filters),
      staleTime: 60 * 1000
   });

   return (
      <Container>
         <div className='flex gap-6'>
            <FiltersSidebar 
               filters={filters} 
               onChange={setFilters}
               onClear={clearFilters}
            />
            <div className='flex-1 bg-white p-4'>
               <div>
                  <p className='text-sm text-gray-400'>223 total results found</p>
               </div>
            </div>
         </div>
      </Container>
   )
}

export default JobListing;