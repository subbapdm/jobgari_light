import { Link } from "react-router-dom";
import { Bookmark, Briefcase, Clock, Flame } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import type { Job } from "@/types/job.types";
import { Button } from "./ui/button";

interface JobCardProps{
   job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
   return (
      <Link key={job._id} to={`/jobs/${job.slug}`} className="group block rounded-lg border border-slate-200 bg-white p-5 space-y-4">
         <div className="flex items-start justify-between mb-3">
            <div className="size-11 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-400 shrink-0">
               {job.company?.logo ? (
                  <img src={job.company.logo} alt={job.company.name} className="size-11 rounded-full object-cover" />
               ) : (
                  <span>{job.company?.name?.charAt(0) ?? ""}</span>
               )}
            </div>
            <div className="flex gap-1">
               {job.isUrgent && (
                  <Button variant="ghost" className="size-8 text-red-600 hover:bg-transparent hover:text-red-600">
                     <Flame className="size-5"/>
                  </Button>
               )}
               <Button variant="outline" className="size-8 text-gray-300 hover:text-gray-400 border-none">
                  <Bookmark className="size-5" />
               </Button>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-slate-800">{job.company?.name}</p>
            <span className="text-xs text-gray-400">{formatDistanceToNow(new Date(job.createdAt), {
               addSuffix: true
            })}
            </span>
         </div>
         <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-1">{job.title}</h3>
         </div>

         <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8rem] text-slate-500">
            <span className="flex items-center gap-1.5 py-2 px-2 rounded-sm text-sm text-gray-500 capitalize">
               <Briefcase className="size-3" />
               {job.jobType}
            </span>
            
            <span className="flex items-center gap-1.5 py-2 px-2 rounded-sm text-sm text-gray-500 capitalize">
               <Clock className="size-3" />
               {job.workMode}
            </span>
         </div>

         <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8rem]">
            {job.skills.map((skill, i) => (
               <span key={`${skill.toLowerCase()}-${i}`} className="flex items-center gap-1 bg-gray-100 py-2 px-2 rounded-sm text-gray-800 font-medium text-xs">
                  {skill}
               </span>
            ))}
            
         </div>

         <div className="flex items-center gap-2 mt-8">
            <div>
               {!job.salary.undisclosed && (
                  <>
                     <strong className="text-gray-700 text-sm">
                     {job.salary.currency === "EUR" ? "€" : job.salary.currency === "GBP" ? "£" : "$"}{job.salary.min} - {job.salary.max} 
                     </strong>
                     /{job.salary.period}
                  </>
               )}
               {job.location?.city && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                     {job.location?.city}
                  </span>
               )}
            </div>
         </div>
      </Link>
   )
}

export default JobCard;