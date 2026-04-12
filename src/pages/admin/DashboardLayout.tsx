import { Outlet } from "react-router-dom"
import Sidebar from "./_components/Sidebar"
import Navbar from "./_components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout;