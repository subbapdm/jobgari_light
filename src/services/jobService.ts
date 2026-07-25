import type { JobFormData } from "@/pages/admin/jobs/Create";
import { ApiClient } from "./client";
import type { ApiResponse } from "@/types/api.types";
import type { Job } from "@/types/job.types";

export interface JobsParams {
   search?: string;
   status?: string;
   jobType?: string;
   workMode?: string;
   experience?: string;
   education?: string;
   category?: string;
   location?: string;
   company?: string;
   salaryMin?: string;
   salaryMax?: string;
   isFeatured?: string;
   isUrgent?: string;
   sortBy?: string;
   sortOrder?: string;
   page?: string;
};

export class JobsService extends ApiClient {
   /**
    * Get all jobs
   */
   async getJobs(params: JobsParams = {}): Promise<ApiResponse<Job[]>>{
      const query = new URLSearchParams();

      Object.entries(params).forEach(([key, val]) => {
         if(val !== undefined && val !== "") query.append(key, String(val))
      });

      const qs = query.toString();
      return this.request(`/jobs${qs ? `?${qs}` : ""}`);
   }

   /**
    * Create a new job
   */
   async createJob(data: JobFormData): Promise<ApiResponse<Job>> {
      return this.request("/jobs", {
         method: "POST",
         body: JSON.stringify(data)
      })
   };

}

export const jobsService = new JobsService();