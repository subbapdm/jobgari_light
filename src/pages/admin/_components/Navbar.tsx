import { User } from "lucide-react"
import { Button } from "../../../components/ui/button"

const Navbar = () => {
   return (
      <header className="bg-white flex items-center justify-between min-h-14 border-b border-slate-200 px-4">
         <div>

         </div>
         <div>
            <Button size="icon" className="rounded-full">
               <User />
            </Button>
         </div>
      </header>
   )
}

export default Navbar