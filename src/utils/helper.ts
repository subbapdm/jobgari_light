import type { Job } from "@/types/job.types";

export const slugify = (text: string) => {
   return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")      // Replace spaces with -
      .replace(/[^\w-]+/g, "")   // Remove all non-word chars
      .replace(/--+/g, "-")      // Replace multiple - with single -
      .replace(/^-+/, "")        // Trim - from start
      .replace(/-+$/, "")        // Trim - from end
};


export const formatSalary = (salary: Job["salary"]) => {
   if(!salary || salary.undisclosed) return null;
   if(salary.min === null || salary.max === null) return null;
   
   const symbool = salary.currency === "EUR" ? "€" : salary.currency === "GBP" ? "£" : "$";
   const fmt = (n: number) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

   return {
      amount: `${symbool}${fmt(salary.min)} - ${symbool}${fmt(salary.max)}`,
      period: `/${salary.period}`
   }
};
