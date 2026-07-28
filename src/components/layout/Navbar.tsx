import { Link } from "react-router-dom";
import Container from "../Container";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
   return (
      <div className="bg-white shadow-sm p-4 border-b-2 border-teal-600/50">
         <Container>
            <div className="flex items-center justify-between">
               <div>
                  <img src="/logo.svg" width={150} height={50} />
               </div>
               <div className="flex items-center gap-8">
                  <nav>
                     <ul className="flex items-center gap-10">
                        <li className="text-sm text-gray-600 font-medium">
                           <Link to="/">Find Jobs</Link>
                        </li>
                        <li className="text-sm text-gray-600 font-medium">
                           <Link to="/">About Us</Link>
                        </li>
                        <li className="text-sm text-gray-600 font-medium">
                           <Link to="/">Companies</Link>
                        </li>
                        <li className="text-sm text-gray-600 font-medium">
                           <Link to="/">Contact Us</Link>
                        </li>
                     </ul>
                  </nav>
                  <div className="flex items-center gap-4">
                     <Link to="/sign-in" className={cn(buttonVariants({ variant: "outline", }), "min-h-10 px-4 rounded-md text-sm font-medium text-gray-600")}>Sign In</Link>
                     <Link to="/sign-up"  className={cn(buttonVariants({ variant: "default", }), "min-h-10 px-4 rounded-md bg-teal-500 text-sm font-medium")}>Post a Job</Link>
                  </div>
               </div>
            </div>
         </Container>
      </div>
   )
}

export default Navbar;