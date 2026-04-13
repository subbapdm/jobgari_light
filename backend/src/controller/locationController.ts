import type { Request, Response } from "express";
import Location from "../models/Location";

export const getLocations = async (req: Request, res: Response) => {
   try {
      const locations = await Location.find().lean();

      res.status(200).json({ locations });
   } catch (err) {
      res.status(500).json({ message: "Internal server error" });
   }
}