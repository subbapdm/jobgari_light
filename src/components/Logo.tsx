import { SquareDashedMousePointer } from "lucide-react";
import { Link } from "react-router-dom"

interface LogoProps {
   isCollapsed: boolean;
}

const Logo = ({ isCollapsed }: LogoProps) => {
   return (
      <Link to="/" className="flex items-center gap-2">
         <div className="size-8 bg-teal-500 text-white p-1.5 rounded-md">
            <SquareDashedMousePointer size={20} />
         </div>
         {!isCollapsed && (
            <div className="space-y-0 flex flex-col">
               <h2 className="font-bold text-md text-slate-700 uppercase leading-tight">Jobgari</h2>
               <span className="text-[0.7rem] text-gray-400">Admin Portal</span>
            </div>
         )}
      </Link>
   )
}

export default Logo;