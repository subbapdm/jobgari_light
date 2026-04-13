import type { Request, Response } from "express";
import Category from "../models/Category";

export const getCategories = async (req: Request, res: Response) => {
   try {
      const categories = await Category.find().lean();

      res.status(200).json({ categories });
   } catch (err) {
      res.status(500).json({ message: "Internal server error" });
   }
}