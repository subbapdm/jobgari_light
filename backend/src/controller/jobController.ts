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
      const { title, slug, company, deadline, description, category, location, jobType, workMode, experience, salary, education, skills, status, isFeatured, isUrgent } = req.body;

      if(!req.user?._id){
         res.status(401).json({ message: "Unauthorized" });
         return;
      }

      const existingSlug = await Job.findOne({ slug });
      if(existingSlug){
         res.status(409).json({ message: "A job with this slug already exists." });
         return;
      }


      const job = Job.create({
         user: req.user._id,
         title,
         slug,
         company,
         deadline: new Date(deadline),
         description,
         category,
         location,
         jobType,
         workMode,
         experience,
         salary: salary ?? null,
         education,
         skills: skills ?? [],
         status: status ?? "active",
         isFeatured: isFeatured ?? false,
         isUrgent: isUrgent ?? false
      });

      res.status(201).json({ message: "Job created successfully", job });
   } catch (err) {
      res.status(500).json({ message: "Internal server error" });
   }
};