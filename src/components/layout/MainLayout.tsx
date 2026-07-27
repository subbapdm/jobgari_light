import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
   return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
         {/* NAVBAR */}
         <Navbar />
         <main className="flex-1">
            <Outlet />
         </main>
         {/* FOOTER */}
         <Footer />
      </div>
   )
}

export default MainLayout;