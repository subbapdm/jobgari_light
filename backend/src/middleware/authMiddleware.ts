import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { type IUser } from "../models/User";

export interface AuthRequest extends Request {
   user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
   try {
      let token: string | undefined;

      if(req.cookies?.token){
         token = req.cookies.token;
      } else if(req.headers.authorization?.startsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1];
      }

      if(!token){
         res.status(401).json({ message: "Not authorized, no token" });
         return;
      }

      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

         const user = await User.findById(decoded.id).select("-password");
         if(!user){
         res.status(401).json({ message: "User not found!" });
         return;
         }
         
         // Attach user id to request
         req.user = user;

         next();
      } catch (err) {
         if(err instanceof jwt.JsonWebTokenError){
            res.status(401).json({ message: "Invalit token" });
            return;
         }
         throw err;
      }
   } catch (err) {
      console.log("[Auth Middleware]", err);
      res.status(401).json({ message: "Not authorized, token failed." });
   }
}