import { ApiClient } from "./client"
import type { Company } from "@/types/company";

export class CompanyService extends ApiClient{
   /**
    * Get all companies
    */
   async getCompanies(): Promise<{ companies: Company[] }>{
      return this.request("/companies");
   }
}

export const companyService = new CompanyService();