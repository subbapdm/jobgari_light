import Container from '@/components/Container';
import JobCard from '@/components/JobCard';
import FiltersSidebar from '@/components/jobs/FiltersSidebar';
import { PUBLIC_DEFAULT_FILTERS, type PublicJobFilters } from '@/schemas/jobFilterSchema';
import { jobsService } from '@/services/jobService';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';


const getArrayParam = (paramValue: string | null): string[] => {
   if(!paramValue) return [];
   return paramValue.split(",").filter(Boolean);;
};

const JobListing = () => {
   const [ searchParams, setSearchParams ] = useSearchParams();

   // Simplified version of useJobFilters hook
   const filters: PublicJobFilters = useMemo(() => {
      return {
         keyword: searchParams.get("keyword") ?? PUBLIC_DEFAULT_FILTERS.keyword,
         location: searchParams.get("location") ?? PUBLIC_DEFAULT_FILTERS.location,
         status: "active",

         jobType: getArrayParam(searchParams.get("jobType")),
         workMode: getArrayParam(searchParams.get("workMode")),
         experience: getArrayParam(searchParams.get("experience")),
         education: getArrayParam(searchParams.get("education")),

         category: searchParams.get("category") ?? PUBLIC_DEFAULT_FILTERS.category,
         company: searchParams.get("company") ?? PUBLIC_DEFAULT_FILTERS.company,
         salaryMin: searchParams.get("salaryMin") ? Number(searchParams.get("salaryMin")) : null,
         salaryMax: searchParams.get("salaryMax") ? Number(searchParams.get("salaryMax")) : null,
         isUrgent: searchParams.get("isUrgent") === "true" ? true : null,

         sortBy: searchParams.get("sortBy") ?? PUBLIC_DEFAULT_FILTERS.sortBy,
         sortOrder: searchParams.get("sortOrder") ?? PUBLIC_DEFAULT_FILTERS.sortOrder,
         page: searchParams.get("page") ?? PUBLIC_DEFAULT_FILTERS.page
      };
   }, [searchParams]);

   const setFilters = useCallback((newFilters: Partial<PublicJobFilters>) => {
      const merged = { ...filters, ...newFilters };

      if(!('page' in newFilters)){
         merged.page = PUBLIC_DEFAULT_FILTERS.page;
      }

      const params = new URLSearchParams();

      (Object.keys(merged) as Array<keyof PublicJobFilters>).forEach((key) => {
         const value = merged[key];
         const defaultValue = PUBLIC_DEFAULT_FILTERS[key];

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


   const { data, } = useQuery({
      queryKey: ["jobs", filters],
      queryFn: () => jobsService.getJobs(filters),
      staleTime: 60 * 1000
   });

   const jobs = data?.data ?? [];

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
               <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {jobs.map((job) => (
                     <JobCard job={job} />
                  ))}
               </div>
            </div>
         </div>
      </Container>
   )
}

export default JobListing;