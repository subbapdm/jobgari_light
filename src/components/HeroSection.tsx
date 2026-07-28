
import { ArrowRight, Briefcase, Computer, GraduationCap, Home } from "lucide-react";
import Container from "./Container";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

const HeroSection = () => {
   return (
      <section className="bg-gradient-to-b from-teal-100 to-slate-50 min-h-[400px] flex items-center justify-center py-14 px-4">
         <Container>
            <div className="flex flex-col gap-8">
               <div className="space-y-10">
                  <div className="space-y-4">
                     <h1 className="text-5xl font-extrabold text-slate-700">Discover Jobs That Match Your Skills</h1>
                     <p className="text-md text-slate-500 font-medium">Connect with leading companies, and take the next step in your professional journey.</p>
                  </div>
                  <div className="f">
                     <div className="max-w-lg flex items-center bg-white relative rounded-md">
                        <Input 
                           placeholder="Search..."
                           className="min-h-14 pl-4 text-base pr-12 border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus:ring-2 focus:ring-teal-200 focus:border-1 focus:!border-teal-200 placeholder:text-base placeholder:text-gray-300"
                        />
                        <Button className="absolute right-1 min-h-12 bg-teal-500 px-4 text-base">
                           Search Jobs
                        </Button>
                     </div>
                  </div>
               </div>

               <div className="flex flex-wrap gap-4 mt-10">

                  <Link to="/" className="bg-white shadow-md flex items-center gap-2 p-4 border border-gray-200 rounded-md">
                     <div className="size-8 bg-teal-100 text-teal-700 p-1.5 rounded-full shrink-0">
                        <Home className="size-5" />
                     </div>
                     <span className="font-medium text-slate-600">Remote</span>
                     <ArrowRight className="size-4" />
                  </Link>

                  <Link to="/" className="bg-white shadow-md flex items-center gap-2 p-4 border border-gray-200 rounded-md">
                     <div className="size-8 bg-teal-100 text-teal-700 p-1.5 rounded-full shrink-0">
                        <Briefcase className="size-5" />
                     </div>
                     <span className="font-medium text-slate-600">Sales</span>
                     <ArrowRight className="size-4" />
                  </Link>

                  <Link to="/" className="bg-white shadow-md flex items-center gap-2 p-4 border border-gray-200 rounded-md">
                     <div className="size-8 bg-teal-100 text-teal-700 p-1.5 rounded-full shrink-0">
                        <Computer className="size-5" />
                     </div>
                     <span className="font-medium text-slate-600">Software & IT</span>
                     <ArrowRight className="size-4" />
                  </Link>

                  <Link to="/" className="bg-white shadow-md flex items-center gap-2 p-4 border border-gray-200 rounded-md">
                     <div className="size-8 bg-teal-100 text-teal-700 p-1.5 rounded-full shrink-0">
                        <GraduationCap className="size-5" />
                     </div>
                     <span className="font-medium text-slate-600">Teacher</span>
                     <ArrowRight className="size-4" />
                  </Link>

                  <Link to="/" className="bg-white shadow-md flex items-center gap-2 p-4 border border-gray-200 rounded-md">
                     <div className="size-8 bg-teal-100 text-teal-700 p-1.5 rounded-full shrink-0">
                        <Home className="size-5" />
                     </div>
                     <span className="font-medium text-slate-600">Remote</span>
                     <ArrowRight className="size-4" />
                  </Link>
                  <Link to="/" className="bg-white shadow-md flex items-center gap-2 p-4 border border-gray-200 rounded-md">
                     <div className="size-8 bg-teal-100 text-teal-700 p-1.5 rounded-full shrink-0">
                        <Home className="size-5" />
                     </div>
                     <span className="font-medium text-slate-600">Remote</span>
                     <ArrowRight className="size-4" />
                  </Link>
                  <Link to="/" className="bg-white shadow-md flex items-center gap-2 p-4 border border-gray-200 rounded-md">
                     <div className="size-8 bg-teal-100 text-teal-700 p-1.5 rounded-full shrink-0">
                        <Home className="size-5" />
                     </div>
                     <span className="font-medium text-slate-600">Remote</span>
                     <ArrowRight className="size-4" />
                  </Link>

               </div>
            </div>
         </Container>
      </section>
   )
}

export default HeroSection;