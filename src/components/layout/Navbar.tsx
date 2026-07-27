import { Link } from "react-router-dom";
import Container from "../Container";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
   return (
      <div className="bg-white shadow-sm p-4">
         <Container>
            <div className="flex items-center justify-between">
               <div>
                  <img src="/logo.svg" width={150} height={50} />
               </div>
               <div className="flex items-center gap-8">
                  <nav>
                     <ul className="flex items-center gap-6">
                        <li className="text-sm text-gray-700 font-medium">
                           <Link to="/">Home</Link>
                        </li>
                        <li className="text-sm text-gray-700 font-medium">
                           <Link to="/">About Us</Link>
                        </li>
                        <li className="text-sm text-gray-700 font-medium">
                           <Link to="/">Jobs</Link>
                        </li>
                        <li className="text-sm text-gray-700 font-medium">
                           <Link to="/">Contact Us</Link>
                        </li>
                     </ul>
                  </nav>
                  <div className="flex items-center gap-4">
                     <Link to="/" className={cn(buttonVariants({ variant: "outline", }), "min-h-11 px-4 rounded-md text-sm font-medium")}>Login</Link>
                     <Link to="/"  className={cn(buttonVariants({ variant: "default", }), "min-h-11 px-4 rounded-md bg-teal-500 text-sm font-medium")}>Register</Link>
                  </div>
               </div>
            </div>
         </Container>
      </div>
   )
}

export default Navbar;