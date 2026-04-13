import type { JobFormData } from "@/pages/admin/jobs/Create";
import { ApiClient } from "./client";
import type { ApiResponse } from "@/types/api.types";


export class JobsService extends ApiClient {

   /**
    * Create a new job
    */
   async createJob(data: JobFormData): Promise<ApiResponse> {
      return this.request("/jobs", {
         method: "POST",
         body: JSON.stringify(data)
      })
   };

}

export const jobsService = new JobsService();