import type { JobFormData } from "@/pages/admin/jobs/Create";
import { ApiClient } from "./client";
import type { ApiResponse } from "@/types/api.types";
import type { Job } from "@/types/job.types";

export interface JobsParams {
   keyword?: string;
   status?: string;
   jobType?: string | string[];
   workMode?: string | string[];
   experience?: string | string[];
   education?: string | string[];
   category?: string;
   location?: string;
   company?: string;
   salaryMin?: number | null;
   salaryMax?: number | null;
   isFeatured?: boolean | null;
   isUrgent?: boolean | null;

   sortBy?: string;
   sortOrder?: string;
   page?: string;
   limit?: string;
};

export class JobsService extends ApiClient {
   /**
    * Get all jobs
   */
   async getJobs(params: JobsParams = {}): Promise<ApiResponse<Job[]>>{
      const query = new URLSearchParams();

      Object.entries(params).forEach(([key, val]) => {
         if(val === undefined || val === null || val === "") return;

         if(Array.isArray(val)){
            if(val.length > 0) query.append(key, val.join(","));
         } else {
            query.append(key, String(val));
         }
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