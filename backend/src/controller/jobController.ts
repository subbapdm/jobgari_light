import type { Request, Response } from "express";

export const getJobs = async (req: Request, res: Response) => {
   try {
      
   } catch (err) {
      
   }
};

export const createJob = async (req: Request, res: Response) => {
   try {
      const { title, description, category, location, jobType, workMode, salary, experience, education, skills, status, isFeatured, isUrgent } = req.body;

      console.log(title, description, category, location, jobType, workMode, salary, experience, education, skills, status, isFeatured, isUrgent)
   } catch (err) {
      
   }
}