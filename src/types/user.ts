export interface User {
   _id: string;
   name: string;
   email: string;
   avatar: string;
   role: "jobseeker" | "employer" | "admin";
   isVerified: boolean;
   createdAt: string;
   updatedAt: string;
}