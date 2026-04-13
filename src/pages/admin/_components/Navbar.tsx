import { ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
   handleToggle: () => void;
   isCollapsed: boolean;
}

const Navbar = ({ handleToggle, isCollapsed }: NavbarProps) => {
   return (
      <header className="bg-white flex items-center justify-between min-h-14 border-b border-slate-200 px-4">
         <Button onClick={handleToggle} variant="ghost" size="icon" className="border border-gray-200 text-gray-500">
            <ChevronLeft className={`h-5 w-5 transition-transform duration-400 ${isCollapsed && "rotate-180"}`} />
         </Button>
         <div>
            <Button size="icon" className="rounded-full">
               <User />
            </Button>
         </div>
      </header>
   )
}

export default Navbar