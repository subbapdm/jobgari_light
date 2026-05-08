import type { SignUpData } from "@/pages/auth/SignUp";
import { ApiClient } from "./client"
import type { ApiResponse } from "@/types/api.types";
import type { SignInData } from "@/pages/auth/SignIn";
import type { User } from "@/types/user";


export class AuthService extends ApiClient {
   /**
    * Sign up new user
   */
   async SignUp(data: SignUpData): Promise<ApiResponse<User>>{
      return this.request("/auth/signup", {
         method: "POST",
         body: JSON.stringify(data)
      });
   };

   /**
    *  Sign In user
    */
   async SignIn(data: SignInData): Promise<ApiResponse<User>>{
      return this.request("/auth/signin", {
         method: "POST",
         body: JSON.stringify(data)
      });
   };

   /**
    * Get current user
    */
   async AuthCheck(): Promise<ApiResponse<User>>{
      return this.request("/auth/me", {
         method: "GET"
      });
   }

   /**
    * Logout user
    */
   async Logout(): Promise<ApiResponse>{
      return this.request("/auth/logout", {
         method: "POST"
      });
   }

   /**
    * Refresh session
    */
   async Refresh(): Promise<ApiResponse>{
      return this.request("/auth/refresh", {
         method: "POST"
      });
   }

}

export const authService = new AuthService();