import type { EDUCATION_LEVELS, EXPERIENCE_LEVELS, JOB_STATUSES, JOB_TYPES, SALARY_CURRENCIES, SALARY_PERIODS, WORK_MODES } from "@/constants/jobEnums";
import type { Location } from "../types/location";
import type { Company } from "./company";
import type { Category } from "./category";

export type JobType = typeof JOB_TYPES[number];
export type WorkMode = typeof WORK_MODES[number];
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
export type EducationLevel = typeof EDUCATION_LEVELS[number];
export type JobStatus = typeof JOB_STATUSES[number];
export type SalaryCurrency = typeof SALARY_CURRENCIES[number];
export type SalaryPeriod = typeof SALARY_PERIODS[number];


export interface Salary{
   min: number | null;
   max: number | null;
   currency: SalaryCurrency;
   period: SalaryPeriod;
   undisclosed: boolean;
}

export interface Job{
   _id: string;
   user: string;
   company: Company;
   category: Category;
   location: Location | null;
   title: string;
   slug: string;
   description: string;
   deadline: string;
   jobType: JobType;
   workMode: WorkMode;
   salary: Salary;
   experience: ExperienceLevel;
   education?: EducationLevel;
   skills: string[];
   status: JobStatus;
   isFeatured: boolean;
   isUrgent: boolean;
   totalApplications: number;

   createdAt: string;
   updatedAt: string;
}