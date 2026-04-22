import type { Request, Response } from "express";
import Job from "../models/Job";
import type { IUser } from "../models/User";

interface AuthRequest extends Request{
   user?: IUser;
}

export const getJobs = async (req: Request, res: Response) => {
   try {
      
   } catch (err) {
      
   }
};

export const createJob = async (req: AuthRequest, res: Response) => {
   try {
      const { title, description, category, location, jobType, workMode, salary, experience, education, skills, status, isFeatured, isUrgent } = req.body;

      console.log(title, description, category, location, jobType, workMode, salary, experience, education, skills, status, isFeatured, isUrgent);

      const job = Job.create({
         user: req.user?._id,
         company: "69e7eb3056e8baf537139b0c",
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
      res.status(500).json({ message: "Internal server error" });
   }
};