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
   hasHydrated: boolean;
   setHasHydrated: (value: boolean) => void;

   authInitialized: boolean;

   signUp: (data: SignUpData) => Promise<void>;
   signIn: (data: SignInData) => Promise<void>;
   authCheck: () => Promise<void>;
   logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         user: null,
         loading: false,
         isAuthenticated: false,
         hasHydrated: false,
         authInitialized: false,

         setHasHydrated: (value: boolean) => set({ hasHydrated: value }),

         signUp: async (data: SignUpData) => {
            set({ loading: true });

            try {
              await authService.SignUp(data);
            } catch (err) {
               throw err;
            } finally {
               set({ loading: false });
            }
         },
         signIn: async (data: SignInData) => {
            set({ loading: true });

            try {
               const response = await authService.SignIn(data);
               console.log(response);
               set({
                  user: response.data,
                  isAuthenticated: true,
               });
            } catch (err) {
               set({
                  user: null,
                  isAuthenticated: false
               });
               throw err;
            } finally {
               set({ loading: false });
            }
         },
         authCheck: async () => {
            set({ loading: true });

            try {
               const response = await authService.AuthCheck();
               set({
                  user: response.data,
                  isAuthenticated: true,
               });
            } catch (err) {
               set({
                  user: null,
                  isAuthenticated: false
               });
            } finally {
               set({ loading: false, authInitialized: true });
            }
         },
         logout: async () => {
            set({ loading: true });

            try {
               await authService.Logout();
               set({
                  user: null,
                  isAuthenticated: false
               });
            } catch (err) {
               throw err;
            } finally {
               set({ loading: false });
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
               state.setHasHydrated(true);
               state.authCheck();
            }
         }
      },
   ),
);

export default useAuthStore;