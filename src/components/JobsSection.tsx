import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { jobsService } from "@/services/jobService";
import { Button } from "./ui/button";
import Container from "./Container";
import JobCard from "./JobCard";


const JobsSection = () => {
   const { data, isLoading } = useQuery({
      queryKey: ["jobs", { status: "active", limit: 10 }],
      queryFn: () => jobsService.getJobs({ status: "active", limit: "8", sortBy: "createdAt", sortOrder: "desc" }),
      select: (res) => res.data
   });

   console.log(data);

   if(isLoading){
      return(
         <section className="px-4 py-16">
            <Container>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                     <div key={i} className="h-44 rounded-lg bg-white border border-slate-200 animate-pulse" />
                  ))}
               </div>
            </Container>
         </section>
      )
   }

   if(!data || data.length === 0){
      return(
         <section className="px-4 py-16 text-center">
            <Container>
               <p className="text-slate-400">No open position right now - check back soon.</p>
            </Container>
         </section>
      )
   }

   return (
      <section className="px-4 py-16">
         <Container>
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800">Latest Openings</h2>
                  <p className="text-sm text-slate-400 mt-1">Explore our newest job oppotunities.</p>
               </div>
               <Button variant="link" className="hidden sm:inline-flex text-slate-600 hover:text-teal-500">
                  <Link to="/jobs">View All</Link>
               </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
               {data.map((job) => (
                  <JobCard key={job._id} job={job} />
               ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
               <Button variant="outline">
                  <Link to="/jobs">View all jobs</Link>
               </Button>
            </div>
         </Container>
      </section>
   )
}

export default JobsSection;