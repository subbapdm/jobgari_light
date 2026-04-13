import type { Request, Response } from "express";
import Job from "../models/Job";

export const getJobs = async (req: Request, res: Response) => {
   try {
      
   } catch (err) {
      
   }
};

export const createJob = async (req: Request, res: Response) => {
   try {
      const { title, description, category, location, jobType, workMode, salary, experience, education, skills, status, isFeatured, isUrgent } = req.body;

      const job = Job.create({
         user: req.body.user,
         company: req.body.company,
         title,
         description,
         category,
         location,
         jobType,
         workMode,
         salary,
         experience,
         education,
         skills,
         status: status || "active",
         isFeatured: isFeatured || false,
         isUrgent: isUrgent || false
      });

      res.status(201).json({ message: "Job created successfully", job });
   } catch (err) {
      res.status(500).json({ message: "Interna server error" });
   }
};