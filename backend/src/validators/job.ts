import z from "zod";
import {
  EDUCATION_LEVELS,
  EXPERIENCE_LEVELS,
  JOB_STATUSES,
  JOB_TYPES,
  WORK_MODES,
} from "../constants/jobEnums";

function multiEnum<T extends readonly [string, ...string[]]>(values: T) {
  return z.preprocess(
    (val) => {
      if (typeof val !== "string") return val;
      return val
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    },
    z.array(z.enum(values)).optional(),
  );
}

export const jobQuerySchema = z
  .object({
    // Pagination
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),

    keyword: z.string().trim().optional(),
    status: z.enum(JOB_STATUSES).optional(),

    jobType: multiEnum(JOB_TYPES),
    workMode: multiEnum(WORK_MODES),
    experience: multiEnum(EXPERIENCE_LEVELS),
    education: multiEnum(EDUCATION_LEVELS),

    category: z.string().optional(),
    location: z.string().optional(),
    company: z.string().optional(),

    salaryMin: z.coerce.number().min(0).optional(),
    salaryMax: z.coerce.number().min(0).optional(),

    isFeatured: z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .optional(),
    isUrgent: z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .optional(),

    sortBy: z
      .enum(["createdAt", "deadline", "totalApplications", "title"])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .refine(
    (data) =>
      data.salaryMin === undefined ||
      data.salaryMax === undefined ||
      data.salaryMin <= data.salaryMax,
    {
      message: "SalaryMin cannot exceed salaryMax",
      path: ["salaryMax"],
    },
  );

export type JobQuerySchema = z.infer<typeof jobQuerySchema>;
