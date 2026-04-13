import { Outlet } from "react-router-dom"
import Sidebar from "./_components/Sidebar"
import Navbar from "./_components/Navbar";
import { useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type SidebarState = {
  sidebarOpen: boolean;
  isCollapsed: boolean;
}

const DashboardLayout = () => {
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    sidebarOpen: false,
    isCollapsed: false
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleToggle = () => {
    if(isMobile) {
      setSidebarState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
    } else {
      setSidebarState(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }))
    }
  }

  const isOpen = sidebarState.sidebarOpen;
  const isCollapsed = sidebarState.isCollapsed;


  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className={cn("h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300", isMobile ? "fixed inset-y-0 left-0 -translate-x-full" : "translate-x-0", (isMobile && isOpen) && "translate-x-0 z-50", isCollapsed ? "w-16" : "w-64")}>
        <Sidebar isCollapsed={isCollapsed} />
      </aside>

      {/* MOBILE OVERLAY */}
        {(isMobile && isOpen) && (
          <div className="fixed inset-0 bg-black/25 z-40 backdrop-blur-sm" onClick={handleToggle} />
        )}

      <main className="flex-1">
        <Navbar handleToggle={handleToggle}/>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout;