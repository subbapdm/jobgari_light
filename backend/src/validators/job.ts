import z from "zod";
import { EDUCATION_LEVELS, EXPERIENCE_LEVELS, JOB_STATUSES, JOB_TYPES, WORK_MODES } from "../constants/jobEnums";


export const jobQuerySchema = z.object({
   // Pagination
   page: z.coerce.number().int().min(1).default(1),
   limit: z.coerce.number().int().min(1).max(100).default(10),

   search: z.string().trim().optional(),
   status: z.enum(JOB_STATUSES).optional(),
   jobType: z.enum(JOB_TYPES).optional(),
   workMode: z.enum(WORK_MODES).optional(),
   experience: z.enum(EXPERIENCE_LEVELS).optional(),
   education: z.enum(EDUCATION_LEVELS).optional(),

   category: z.string().optional(),
   location: z.string().optional(),
   company: z.string().optional(),

   salaryMin: z.coerce.number().min(0).optional(),
   salaryMax: z.coerce.number().min(0).optional(),

   isFeatured: z.enum(["true", "false"]).transform((v) => v = "true").optional(),
   isUrgent: z.enum(["true", "false"]).transform((v) => v === "true").optional(),

   sortBy: z.enum(["createdAt", "deadline", "totalApplications", "title"]).default("createdAt"),
   sortOrder: z.enum(["asc", "desc"]).default("desc")
}).refine(
   (data) => data.salaryMin === undefined || data.salaryMax === undefined || data.salaryMin <= data.salaryMax,
   { message: "SalaryMin cannot exceed salaryMax", path: ["salaryMax"]}
);

export type jobQuerySchema = z.infer<typeof jobQuerySchema>;