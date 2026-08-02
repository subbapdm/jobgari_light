import Container from '@/components/Container';
import JobCard from '@/components/JobCard';
import FiltersSidebar from '@/components/jobs/FiltersSidebar';
import JobCardSkeleton from '@/components/skeletons/JobCardSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PUBLIC_DEFAULT_FILTERS, type PublicJobFilters } from '@/schemas/jobFilterSchema';
import { jobsService } from '@/services/jobService';
import { useQuery } from '@tanstack/react-query';
import { LayoutGrid, List, Search, SearchX } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const getArrayParam = (paramValue: string | null): string[] => {
   if(!paramValue) return [];
   return paramValue.split(",").filter(Boolean);;
};

const JobListing = () => {
   const [ searchParams, setSearchParams ] = useSearchParams();
   const [view, setView] = useState<"grid" | "list">("grid");

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


   const { data, isLoading } = useQuery({
      queryKey: ["jobs", filters],
      queryFn: () => jobsService.getJobs(filters),
      staleTime: 60 * 1000
   });

   const jobs = data?.data ?? [];
   const gridClass = view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "grid grid-cols-1 gap-3";

   return (
      <Container>
         <div className='flex gap-4 py-8'>
            <FiltersSidebar 
               filters={filters} 
               onChange={setFilters}
               onClear={clearFilters}
            />
            <div className='flex-1'>
               <div className='space-y-4'>
                  
                  <div className='flex items-center justify-between gap-4'>
                     <div className='flex-1'>
                        <div className="relative max-w-xl xl:max-w-2xl flex-2">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                           <Input
                              placeholder="Search Jobs..."
                              value={filters.keyword}
                              onChange={(e) => setFilters({ keyword: e.target.value})}
                              className="w-full pl-9 min-h-11 rounded-sm bg-white border border-slate-100 focus-visible:border focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400"
                           />
                        </div>
                     </div>
                     
                     <div className='flex overflow-hidden rounded-md border border-slate-100 bg-white gap-0.5 p-1'>
                        <Button variant="ghost" onClick={() => setView("grid")} aria-pressed={view === "grid"} className={`rounded-sm ${view === "grid" ? "bg-teal-600 text-white hover:bg-teal-700 hover:text-white" : "text-gray-400"}`}>
                           <LayoutGrid className='size-4'/>
                        </Button>
                        <Button variant="ghost" onClick={() => setView("list")} aria-pressed={view === "list"} className={`rounded-sm ${view === "list" ? "bg-teal-600 text-white hover:bg-teal-700 hover:text-white" : "text-gray-400"}`}>
                           <List className='size-4' />
                        </Button>
                     </div>
                  </div>
                  <div>
                     <p className='text-xs text-gray-400'>
                        {isLoading ? "Searching..." : `${jobs.length} total jobs found`}
                     </p>
                  </div>

               </div>

               <div className={cn("mt-4", gridClass)}>
                  {isLoading && Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}

                  {!isLoading && jobs.length === 0 && (
                     <div className='col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center'>
                        <div className='flex size-10 items-center justify-center rounded-full bg-slate-50'>
                           <SearchX className='size-5 text-slate-400' />
                        </div>
                        <h3 className='mt-4 text-base font-bold text-slate-800'>No jobs match these filters</h3>
                        <p className='mt-4 max-w-sm text-sm text-slate-400'>
                           Trying widening your salary range or removing a filter - new roles are posted daily.
                        </p>
                        <Button onClick={clearFilters} className='mt-5 bg-teal-600 text-white hover:bg-teal-700'>
                           Clear all filters
                        </Button>
                     </div>
                  )}

                  {jobs.map((job) => (
                     <JobCard job={job} compact={view === "list"} />
                  ))}
               </div>
            </div>
         </div>
      </Container>
   )
}

export default JobListing;