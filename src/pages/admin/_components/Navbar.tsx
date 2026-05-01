import { ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
   handleToggle: () => void;
   isCollapsed: boolean;
}

const Navbar = ({ handleToggle, isCollapsed }: NavbarProps) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const user = {
      name: "subbapdm",
      email: "subbapdm@gmail.com"
   }
   
   return (
      <header className="bg-white flex items-center justify-between min-h-14 border-b border-slate-100 px-5">
         <Button onClick={handleToggle} variant="ghost" size="icon" className="border border-gray-200 text-gray-500">
            <ChevronLeft className={`h-5 w-5 transition-transform duration-400 ${isCollapsed && "rotate-180"}`} />
         </Button>
         <div className="relative">
            <Button onClick={() => setDropdownOpen(prev => !prev)} size="icon" className="rounded-full">
               <User className="size-6" />
            </Button>
            {dropdownOpen && (
               <div className="min-w-[150px] bg-white shadow-md absolute right-0 p-5 rounded-sm">
                  <div className="flex flex-col space-y-2">
                     <p className="text-sm text-gray-700">{user?.name}</p>
                     <p className="text-sm text-gray-700">{user?.email}</p>
                  </div>
               </div>
            )}
         </div>
      </header>
   )
}

export default Navbar