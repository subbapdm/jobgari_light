import z from "zod";

const baseJobFilterSchema = z.object({
   keyword: z.string().default(""),
   status: z.string().default(""),
   category: z.string().default(""),
   location: z.string().default(""),
   company: z.string().default(""),
   salaryMin: z.number().nullable().default(null),
   salaryMax: z.number().nullable().default(null),
   
   sortBy: z.string().default("createdAt"),
   sortOrder: z.string().default("desc"),
   page: z.string().default("1"),
});

export const adminJobFilterSchema = baseJobFilterSchema.extend({
   jobType: z.string().default(""),
   workMode: z.string().default(""),
   experience: z.string().default(""),
   education: z.string().default(""),
   isFeatured: z.boolean().nullable().default(null),
   isUrgent: z.boolean().nullable().default(null)
});

export const publicJobFilterSchema = baseJobFilterSchema.extend({
   jobType: z.array(z.string()).default([]),
   workMode: z.array(z.string()).default([]),
   experience: z.array(z.string()).default([]),
   education: z.array(z.string()).default([]),
   isUrgent: z.boolean().nullable().default(null)
});

export type AdminJobFilters = z.infer<typeof adminJobFilterSchema>;
export type PublicJobFilters = z.infer<typeof publicJobFilterSchema>;

export const ADMIN_DEFAULT_FILTERS: AdminJobFilters = adminJobFilterSchema.parse({});
export const PUBLIC_DEFAULT_FILTERS: PublicJobFilters = publicJobFilterSchema.parse({});