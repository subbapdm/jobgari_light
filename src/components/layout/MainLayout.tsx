import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useAuthStore from "@/store/useAuthStore";

const MainLayout = () => {
   const { user, isAuthenticated, authInitialized } = useAuthStore();

   return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
         {/* NAVBAR */}
         <Navbar user={user!} isAuthenticated={isAuthenticated}ready={authInitialized} />
         <main className="flex-1">
            <Outlet />
         </main>
         {/* FOOTER */}
         <Footer />
      </div>
   )
}

export default MainLayout;