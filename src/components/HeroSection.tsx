
import { Briefcase, ChevronRight, GraduationCap, Home, MapPin, Search, ShoppingBag, Wand2 } from "lucide-react";
import Container from "./Container";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TEMP_CATEGORIES = [
   { label: "Remote", icon: Home },
   { label: "Sales", icon: ShoppingBag },
   { label: "Software & IT", icon: Briefcase },
   { label: "Teacher", icon: GraduationCap },
   { label: "Design", icon: Wand2 },
]

const HeroSection = () => {
   return (
      <section className="bg-gradient-to-b from-teal-100 to-slate-50 min-h-[400px] flex items-center justify-center py-14 px-4">
         <Container>
            <div className="py-5">
               
               <div className="space-y-10">
                  <div className="space-y-4 text-center">
                     <h1 className="text-5xl font-extrabold text-slate-700">Discover Jobs That Match Your Skills</h1>
                     <p className="text-md text-slate-500 font-medium">Connect with leading companies, and take the next step in your professional journey.</p>
                  </div>

                  {/* SEARCH BAR */}
                  <div className="max-w-3xl mx-auto">
                     <div className="flex items-center gap-2 bg-white rounded-full shadow-[0_5px_10px_-4px_rgba(15,118,110,0.18)] p-2">
                        <div className="flex items-center flex-1 gap-2 px-3">
                           <Search className="size-4 text-slate-400 shrink-0" />
                           <Input
                              placeholder="Job Title, Keyword, or Company"
                              className="border-0 shadow-none focus-visible:ring-0 px-0 h-11 placeholder:text-slate-400"
                           />
                        </div>
                        <div className="w-px h-6 bg-slate-200 hidden sm:block" />
                        <div className="hidden sm:flex items-center flex-1 gap-2 px-3">
                           <MapPin className="size-4 text-slate-400 shrink-0" />
                           <Input
                              placeholder="City or State"
                              className="border-0 shadow-none focus-visible:ring-0 px-0 h-11 placeholder:text-slate-400"
                           />
                        </div>
                        <Button className="rounded-full bg-teal-600 hover:bg-teal-700 h-11 px-6 shrink-0">
                           Search Jobs
                        </Button>
                     </div>
                  </div>

                  {/* TRENDING CATEGORIES */}
                  <div className="flex flex-wrap items-center justify-center gap-4">
                     {TEMP_CATEGORIES.map(({ label, icon: Icon }) => (
                        <button key={label} type="button" className="w-[180px] h-[60px] group flex items-center justify-between gap-2 p-3 rounded-md bg-white hover:bg-white hover:bg-teal-300 text-slate-600 transition-colors cursor-pointer hover:shadow-[0_8px_8px_-4px_rgba(15,118,110,0.18)] transition-all">
                           <div className="flex items-center gap-2">
                              <span className="size-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                                 <Icon className="size-5" />
                              </span>
                              <span className="text-[1rem] font-medium line-clamp-1">{label}</span>
                           </div>
                           <ChevronRight className="size-5 text-slate-400 group-hover:text-teal-600 transition-colors"/>
                        </button>
                     ))}
                  </div>
               </div>

            </div>
         </Container>
      </section>
   )
}

export default HeroSection;