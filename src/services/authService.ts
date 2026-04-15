import type { SignUpData } from "@/pages/auth/SignUp";
import { ApiClient } from "./client";
import type { ApiResponse } from "@/types/api.types";
import type { SignInData } from "@/pages/auth/SignIn";

export class AuthService extends ApiClient {

   /**
    *  Sign Up a new user
    */
   async SignUp(data: SignUpData): Promise<ApiResponse>{
      return this.request("/auth/signup", {
         method: "POST",
         body: JSON.stringify(data)
      })
   };

   /**
    *  Sign In user
    */
   async SignIn(data: SignInData): Promise<ApiResponse>{
      return this.request("/auth/signin", {
         method: "POST",
         body: JSON.stringify(data)
      })
   };


}

export const authService = new AuthService();