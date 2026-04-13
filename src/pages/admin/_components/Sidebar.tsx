import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Briefcase, LayoutDashboard, LogOut, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
   {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard
   },
   {
      label: "Jobs",
      href: "/admin/jobs",
      icon: Briefcase
   },
   {
      label: "Users",
      href: "/admin/users",
      icon: Users
   }
];

interface SidebarProps {
   isCollapsed: boolean;
}
const Sidebar = ({ isCollapsed }: SidebarProps) => {
   const location = useLocation();
   const pathname = location.pathname;

   return (
         <>
            <div className={cn("min-h-14 border-b border-slate-200 flex items-center px-4", isCollapsed && "justify-center")}>
               {isCollapsed ? (
                  <h1 className="text-2xl font-bold text-slate-800">J</h1>
               ) : (
                  <h1 className="text-xl font-bold text-slate-800">Jobgari</h1>
               )}
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
               <ul className={cn("p-4 space-y-2", isCollapsed && "p-2")}>
                  {NAV_LINKS.map((item) => {
                     const isActive = pathname === item.href;
                     return (
                        <li key={item.href} className="text-gray-500">
                           <Link to={item.href} className={cn("flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 hover:text-blue-500", isActive && "bg-blue-50 text-blue-500", isCollapsed && "justify-center")}>
                              <item.icon size={20} />
                              {!isCollapsed && (
                                 <span>{item.label}</span>
                              )}
                           </Link>
                        </li>
                     )
                  })}
               </ul>
            </nav>

            <div>
               <Button className="min-h-12 w-full rounded-none">
                  <LogOut />
                  Logout
               </Button>
            </div>
         </>
      
   )
}

export default Sidebar;