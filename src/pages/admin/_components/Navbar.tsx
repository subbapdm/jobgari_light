import { ArrowLeft, User } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface NavbarProps {
   handleToggle: () => void;
}

const Navbar = ({ handleToggle }: NavbarProps) => {
   return (
      <header className="bg-white flex items-center justify-between min-h-14 border-b border-slate-200 px-4">
         <Button onClick={handleToggle} variant="ghost" size="icon" className="border border-gray-200 text-gray-500">
            <ArrowLeft />
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