import type { Request, Response } from "express";
import Job from "../models/Job";
import type { IUser } from "../models/User";

interface AuthRequest extends Request{
   user?: IUser;
}

export const getJobs = async (req: Request, res: Response) => {
   try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(100, parseInt(req.query.limit as string) || 10);
      const skip = (page - 1) * limit;
      const { search, status, jobType, sort = "-createdAt" } = req.query as Record<string, string>;

      const filter: Record<string, unknown> = {};

      if(search?.trim()){
         filter.title = { $regex: search.trim(), $options: "i" };
      }

      if(status && ["draft", "active", "expired"].includes(status)){
         filter.status = status;
      }

      if(jobType && ["full-time", "part-time", "contract", "internship"].includes(jobType)){
         filter.jobType = jobType;
      }

      const [jobs, total] = await Promise.all([
         Job.find(filter)
            .populate("company", "name logo")
            .populate("category", "name")
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
         Job.countDocuments(filter)
      ]);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
         success: true,
         data: jobs,
         pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
         }
      })
   } catch (err) {
      console.log("[getJobs]", err);
      res.status(500).json({ message: "Internal server error" });
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
      console.log("[createJob]", err);
      res.status(500).json({ message: "Internal server error" });
   }
};