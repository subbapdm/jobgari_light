import { Search } from "lucide-react";
import Container from "./Container";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Hero = () => {
   return (
      <section className="bg-gradient-to-b from-teal-100 to-teal-50 min-h-[400px] flex items-center justify-center py-14 px-4">
         <Container>
            <div className="space-y-6">
               <div className="space-y-4">
                  <h1 className="text-5xl font-extrabold text-slate-700">Discover Jobs That Match Your Skills</h1>
                  <p className="text-lg text-slate-500">Connect with leading companies, and take the next step in your professional journey.</p>
               </div>
               <div className="max-w-lg">
                  <div className="flex items-center bg-white relative rounded-md">
                     <Input 
                        placeholder="Search..."
                        className="min-h-14 pl-4 pr-12 border-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus:ring-2 focus:ring-teal-200 focus:border-none"
                     />
                     <Button className="absolute right-1 min-h-12 bg-teal-500 px-4">
                        Search Jobs
                     </Button>
                  </div>
               </div>
            </div>
         </Container>
      </section>
   )
}

export default Hero;