import type { Request, Response } from "express";
import Company from "../models/Company";

export const getCompanies = async (req: Request, res: Response) => {
   try {
      const companies = await Company.find().lean();

      res.status(200).json({ companies });
   } catch (err) {
      res.status(500).json({ message: "Internal server error" });
   }
}