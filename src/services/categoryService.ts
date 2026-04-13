import { ApiClient } from "./client";
import type { Category } from "@/types/category";

export class CategoryService extends ApiClient{

   /**
    * Get all categories
   */
   async getCategories(): Promise<{ categories: Category[] }>{
      return this.request("/categories");
   }
};

export const categoryService = new CategoryService();