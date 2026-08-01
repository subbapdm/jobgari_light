import { Link } from "react-router-dom";
import { Bookmark, BriefcaseBusiness, Clock, Flame, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import type { Job } from "@/types/job.types";
import { formatSalary } from "@/utils/helper";
import { cn } from "@/lib/utils";

interface JobCardProps{
   job: Job;
   saved?: boolean;
   compact?: boolean;
}


const JobCard = ({ job, saved = false, compact = false }: JobCardProps) => {
   const skillLimit = compact ? 6 : 3;
   const visibleSkills = job.skills.slice(0, skillLimit);
   const extraCount  = job.skills.length - visibleSkills.length;

   const salary = formatSalary(job.salary);

   return (
      <div className="group relative flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(15, 118, 110, 0.18)]">
      
         <Link to={`/jobs/${job.slug}`} aria-label={`View ${job.title} at ${job.company?.name}`} className="absolute inset-0 z-0 rounded-xl" />
            
         <div className="relative z-10 flex items-start justify-between gap-3 mt-4">
            <div className="flex min-w-0 items-center gap-3">
               <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-sm font-bold text-slate-400">
                  {job.company?.logo ? (
                     <img src={job.company.logo} alt="" className="size-11 object-cover" />
                  ) : (
                     <span>{job.company?.name?.charAt(0) ?? "?"}</span>
                  )}
               </div>
               <div className="min-w-0">
                  <p className="trancute text-sm font-semibold text-slate-800">{job.company?.name}</p>
                  <p className="text-xs text-slate-400">
                     {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                  </p>
               </div>
            </div>

            <button type="button" onClick={() => {}} aria-pressed={saved} aria-label={saved ? "Remove from saved jobs" : "Save job"} className={cn("relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-slate-50")}>
               <Bookmark className="size-5" fill={saved ? "currentColor" : "none"} />
            </button>
         </div>

         <h3 className="relative z-10 line-clamp-1 text-lg font-bold leading-snug text-slate-800 transition-colors group-hover:text-teal-700">
            {job.title}
         </h3>

         <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 capitalize">
               <BriefcaseBusiness className="size-3.5" />
               {job.jobType}
            </span>
            <span className="flex items-center gap-1.5 capitalize">
               <Clock className="size-3.5" />
               {job.workMode}
            </span>
            {job.location?.city && (
               <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {job.location.city}
               </span>
            )}
         </div>

         <div className="relative z-10 flex flex-wrap gap-1.5">
            {visibleSkills.map((skill, i) => (
               <span key={`${skill.toLowerCase()}-${i}`} className="rounded-md bg-slate-100 px-2 py-1 text-[0.7rem] font-medium text-slate-700">
                  {skill}
               </span>
            ))}
            {extraCount > 0 && (
               <span className="rounded-md bg-slate-50 px-2 py-1 text-[0.7rem] font-medium text-slate-400">
                  +{extraCount} more
               </span>
            )}
         </div>

         <div className="relative z-10 mt-auto flex items-center justify-between border-t border-slate-50 pt-3">
            {job.salary.undisclosed ? (
               <p className="text-xs text-slate-400">Salary not disclosed</p>
            ) : (
               <p className="text-sm font-bold text-slate-800">
                  {salary?.amount} {" "}
                  <span className="text-xs font-normal text-slate-400">{salary?.period}</span>
               </p>
            )}
         </div>

         {job.isUrgent && (
            <span className="absolute right-0 bottom-0 flex items-center gap-1 rounded-tl-xl rounded-br-lg bg-red-50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-red-600">
               <Flame className="size-3" />
               Urgent
            </span>
         )}

      </div>
   )
}

export default JobCard;