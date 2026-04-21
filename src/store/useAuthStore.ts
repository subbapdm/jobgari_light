import type { SignInData } from "@/pages/auth/SignIn";
import type { SignUpData } from "@/pages/auth/SignUp";
import { authService } from "@/services/authService";
import type { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
   user: User | null;
   loading: boolean;
   isAuthenticated: boolean;

   SignUp: (data: SignUpData) => Promise<void>;
   SignIn: (data: SignInData) => Promise<void>;
   AuthCheck: () => Promise<void>;
   Logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         user: null,
         loading: false,
         isAuthenticated: false,

         SignUp: async (data: SignUpData) => {
            try {
               set({ loading: true });

              await authService.SignUp(data);

               set({ loading: false })
            } catch (err) {
               set({ loading: false });
               throw err;
            }
         },
         SignIn: async (data: SignInData) => {
            try {
               set({ loading: true });

               const response = await authService.SignIn(data);
               set({
                  user: response.data,
                  isAuthenticated: true,
                  loading: false
               });
            } catch (err) {
               set({
                  loading: false,
                  isAuthenticated: false,
                  user: null
               });
               throw err;
            }
         },
         AuthCheck: async () => {
            try {
               set({ loading: true });

               const response = await authService.AuthCheck();

               set({
                  user: response.data,
                  isAuthenticated: true,
                  loading: false
               });
            } catch (err) {
               set({
                  user: null,
                  isAuthenticated: false,
                  loading: false
               });
            }
         },
         Logout: async () => {
            try {
               set({ loading: true });

               await authService.Logout();

               set({
                  user: null,
                  isAuthenticated: false,
                  loading: false
               });
               localStorage.removeItem("auth-store");
            } catch (err) {
               set({ loading: false });
               throw err;
            }
         }

      }),
      {
         name: "auth-store", // localStorage key
         partialize: (state) => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated
         }),
         // After rehydrating from localStorage, verify with server
         onRehydrateStorage: () => (state) => {
            if(state){
               // Automatically check auth after rehydration
               state.AuthCheck();
            }
         }
      },
   ),
);

export default useAuthStore;