import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import type { AuthRequest } from "../middleware/authMiddleware";


/**
 * @des Sign Up a user
 * @route POST /api/auth/signup
 * @access Public
 */
export const SignUp = async (req: Request, res: Response) => {
   try {
      const { name, email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if(existingUser){
         return res.status(400).json({ message: "Email already in use." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({ name, email, password: hashedPassword, role });

      res.status(201).json({
         message: "Account created successfully.",
         user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
         }
      });
   } catch (err) {
      console.error("[SignUP]", err);
      res.status(500).json({ message: "Internal server error" });
   }
}

/**
 * @des Sign In user
 * @route POST /api/auth/signin
 * @access Public
 */
export const SignIn = async (req: Request, res: Response) => {
   try {
      const { email, password: passwordBody } = req.body;

      const user = await User.findOne({ email });
      if(!user){
         return res.status(404).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(passwordBody, user.password);
      if(!isMatch){
         return res.status(401).json({ message: "Invalid credentials" });
      }

      generateToken(res, user._id.toString());

      const {password, ...rest} = user.toObject();

      res.status(200).json({
         message: "Signed in successfully.",
         user: rest
      })
   } catch (err) {
      console.error("[SignIn]", err);
      res.status(500).json({ message: "Internal server error" });
   }
}

/**
 * @des Get current user
 * @route GET /api/auth/me
 * @access Private
 */
export const getMe = async (req: AuthRequest, res: Response) => {
   try {
      res.json({
         user: {
            _id: req.user?._id,
            email: req.user?.email,
            name: req.user?.name,
            role: req.user?.role
         }
      });
   } catch (err) {
      console.error("[GetMe]", err);
      res.status(500).json({ message: "Internal server error" });
   }
};


/**
 * @des Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
export const logout = async (req: Request, res: Response) => {
   try {
      res.cookie("token", "", {
         httpOnly: true,
         expires: new Date(0)
      });

      res.status(200).json({
         message: "Logged out successfully"
      })
   } catch (err) {
      console.log("[Logout]", err);
      res.status(500).json({ message: "Internal server error" });
   }
}

/**
 * @desc Refresh seesion
 * @route POST /api/auth/refresh
 * @access Private (cookie-based)
 */
export const refresh = async (req: AuthRequest, res: Response) => {
   try {
      if(!req.user){
         return res.status(401).json({ message: "Not authenticated" });
      }

      generateToken(res, req.user._id.toString());

      res.json({
         user: {
            _id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role
         }
      });
   } catch (err) {
      console.error("[Refresh]", err);
      res.status(500).json({ message: "Internal server error" });
   }
}