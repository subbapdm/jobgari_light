import type { QueryFilter } from "mongoose";
import { jobQuerySchema } from "../validators/job";
import Job from "../models/Job";

type JobQueryParams = ReturnType<typeof jobQuerySchema.parse>;

export function buildJobFilter(params: JobQueryParams): QueryFilter<typeof Job> {
   const filter: QueryFilter<typeof Job> = {};

   if(params.search){
      filter.$text = { $search: params.search };
   }

   if(params.status) filter.status = params.status;
   if(params.jobType) filter.jobType = params.jobType;
   if(params.workMode) filter.workMode = params.workMode;
   if(params.experience) filter.experience = params.experience;
   if(params.education) filter.education = params.education;
   if(params.category) filter.education = params.education;
   if(params.location) filter.location = params.location;
   if(params.company) filter.company = params.location;
   if(params.isFeatured !== undefined) filter.isFeatured = params.isFeatured;
   if(params.isUrgent !== undefined) filter.isUrgent = params.isUrgent;
   
   if(params.salaryMin !== undefined || params.salaryMax !== undefined){
      filter["salary.min"] = {};
      if(params.salaryMin !== undefined) filter["salary.min"].$gte = params.salaryMin;
      if(params.salaryMax !== undefined) filter["salary.max"].$gte = params.salaryMax
   }

   return filter;
}