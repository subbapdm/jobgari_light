import type { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, userId: string ) => {
   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });

   res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000
   });
}