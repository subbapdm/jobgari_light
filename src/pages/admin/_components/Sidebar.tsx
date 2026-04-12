import { cn } from "@/lib/utils";
import { Briefcase, LayoutDashboard, Users } from "lucide-react";
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
]
const Sidebar = () => {
   const location = useLocation();
   const pathname = location.pathname;

   return (
      <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col">
         <div className="min-h-14 border-b border-slate-200 flex items-center px-4">
            <h1 className="text-xl font-bold text-slate-800">Jobgari</h1>
         </div>

         <nav className="flex-1 space-y-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
               {NAV_LINKS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                     <li className="text-gray-500">
                        <Link to={item.href} className={cn("flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 hover:text-blue-500", isActive && "bg-blue-50 text-blue-500")}>
                           <item.icon size={20} />
                           {item.label}
                        </Link>
                     </li>
                  )
               })}
            </ul>
         </nav>

         <div className="border-t border-slate-200">
            
         </div>
      </aside>
   )
}

export default Sidebar;