import type { Request, Response } from "express";
import Job from "../models/Job";
import type { IUser } from "../models/User";
import { jobQuerySchema } from "../validators/job";
import { buildJobFilter } from "../utils/jobFilters";

interface AuthRequest extends Request{
   user?: IUser;
}

export const getJobs = async (req: Request, res: Response) => {
   try {
      const params = jobQuerySchema.parse(req.query);
      const filter = buildJobFilter(params);

      const skip = (params.page - 1) * params.limit;
      const sortDirection = params.sortOrder === "asc" ? 1 : -1;

      const [jobs, total] = await Promise.all([
         Job.find(filter)
            .populate("company", "name logo")
            .populate("category", "name")
            .populate("location", "city")
            .sort({ [params.sortBy]: sortDirection })
            .skip(skip)
            .limit(params.limit)
            .lean(),
         Job.countDocuments(filter),
      ]);

      res.status(200).json({
         data: jobs,
         pagination: {
            page: params.page,
            limit: params.limit,
            total,
            totalPages: Math.ceil(total / params.limit)
         }
      })

   } catch (err) {
      console.log("[getJobs]", err);
      if(err instanceof Error && err.name === "ZodError"){
         return res.status(400).json({ message: "Invalid query parameters", errors: err });
      }
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