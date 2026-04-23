import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import { Briefcase, Building2, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
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
      label: "Companies",
      href: "/admin/companies",
      icon: Building2
   },
   {
      label: "Users",
      href: "/admin/users",
      icon: Users
   },
   {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings
   }
];

interface SidebarProps {
   isCollapsed: boolean;
}
const Sidebar = ({ isCollapsed }: SidebarProps) => {
   const location = useLocation();
   const pathname = location.pathname;

   const { Logout } = useAuthStore();

   return (
         <>
            <div className={cn("min-h-14 border-b border-slate-100 flex items-center px-4", isCollapsed && "justify-center")}>
               <Logo isCollapsed={isCollapsed} />
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
               <ul className={cn("p-4 space-y-3", isCollapsed && "p-2")}>
                  {NAV_LINKS.map((item) => {
                     const isActive = pathname === item.href;
                     return (
                        <li key={item.href} className="text-gray-500">
                           <Link to={item.href} className={cn("flex items-center gap-2 p-2.5 rounded-md hover:bg-teal-50 hover:text-teal-500 text-sm font-medium", isActive && "bg-teal-50 text-teal-500", isCollapsed && "justify-center")}>
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
               <Button onClick={() => Logout()} className="min-h-12 w-full rounded-none bg-red-50 text-red-600">
                  <LogOut />
                  {!isCollapsed && (
                     <span>Logout</span>
                  ) }
               </Button>
            </div>
         </>
      
   )
}

export default Sidebar;