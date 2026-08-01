import { Link } from "react-router-dom";
import Container from "../Container";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { useState } from "react";
import type { User as UserType } from "@/types/user";

const Navbar = ({ user, isAuthenticated, ready}: { user: UserType; isAuthenticated: boolean; ready: boolean }) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   

   return (
      <div className="bg-white shadow-sm p-4 border-b-2 border-teal-600/50">
         <Container>
            <div className="flex items-center justify-between">
               <div>
                  <Link to="/">
                     <img src="/logo.svg" width={150} height={50} />
                  </Link>
               </div>
               <div className="flex items-center gap-8">
                  <nav>
                     <ul className="flex items-center gap-10">
                        <li className="text-sm text-gray-600 font-medium">
                           <Link to="/jobs">Find Jobs</Link>
                        </li>
                        <li className="text-sm text-gray-600 font-medium">
                           <Link to="/about">About Us</Link>
                        </li>
                        <li className="text-sm text-gray-600 font-medium">
                           <Link to="/companies">Companies</Link>
                        </li>
                        <li className="text-sm text-gray-600 font-medium">
                           <Link to="/contact-us">Contact Us</Link>
                        </li>
                     </ul>
                  </nav>

                  {!ready ? (
                     <div className="size-8 animate-pulse rounded-full bg-slate-200" />
                  ) : (!user && !isAuthenticated) ? (
                     <div className="flex items-center gap-4">
                     <Link to="/sign-in" className={cn(buttonVariants({ variant: "outline", }), "min-h-10 px-4 rounded-md text-sm font-medium text-gray-600")}>Sign In</Link>
                     <Link to="/sign-up"  className={cn(buttonVariants({ variant: "default", }), "min-h-10 px-4 rounded-md bg-teal-500 text-sm font-medium")}>Post a Job</Link>
                     </div>
                  ) : (
                     <>
                     {/* TODO: REUSABLE DROPDOWN COMPONENT  */}
                     <div className="relative">
                        <Button onClick={() => setDropdownOpen(prev => !prev)} size="icon" className="rounded-full bg-teal-600 hover:bg-teal-700">
                           <User className="size-4.5" />
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
                     </>
                  )}
               </div>
            </div>
         </Container>
      </div>
   )
}

export default Navbar;