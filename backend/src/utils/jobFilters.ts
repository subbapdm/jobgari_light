import type { QueryFilter } from "mongoose";
import { jobQuerySchema } from "../validators/job";
import Job from "../models/Job";

type JobQueryParams = ReturnType<typeof jobQuerySchema.parse>;

export function buildJobFilter(params: JobQueryParams): QueryFilter<typeof Job> {
   const filter: QueryFilter<typeof Job> = {};

   if(params.keyword){
      filter.$text = { $search: params.keyword };
   }

   if(params.status) filter.status = params.status;

   if(params.jobType && params.jobType.length) filter.jobType = { $in: params.jobType };
   if(params.workMode && params.workMode.length) filter.workMode = { $in: params.workMode };
   if(params.experience && params.experience.length) filter.experience = { $in: params.experience };
   if(params.education && params.education.length) filter.education = { $in: params.education };

   if(params.category) filter.category = params.category;
   if(params.location) filter.location = params.location;
   if(params.company) filter.company = params.company;
   
   if(params.isFeatured !== undefined) filter.isFeatured = params.isFeatured;
   if(params.isUrgent !== undefined) filter.isUrgent = params.isUrgent;
   
   if(params.salaryMin !== undefined){
      filter["salary.min"] = { $gte: params.salaryMin };
   }
   if(params.salaryMax !== undefined){
      filter["salary.max"] = { $lte: params.salaryMax };
   }

   return filter;
}