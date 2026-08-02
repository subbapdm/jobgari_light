
import { Bell } from "lucide-react";
import Container from "./Container";
import { Button } from "./ui/button";

const PromoSection = () => {
   return (
      <section className="px-4 py-16">
         <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-t from-teal-100 to-teal-50 rounded-xl border border-teal-100">
               <div className="flex items-center p-6">
                  <div className="space-y-4">
                     <h2 className="text-3xl font-bold text-slate-800 leading-[3rem]">Never miss out on the latest <span className="text-teal-700">career opportunities</span></h2>
                     <p className="text-sm text-slate-600">Get daily alerts and stay ahead. Join thousands of professionals who find their next role first. </p>
                     <Button className="min-h-11 bg-teal-600 hover:bg-teal-700 px-4">
                        <Bell className="size-4" />
                        Get Job Alerts
                     </Button>
                  </div>
               </div>
               <div className="flex justify-center md:justify-end overflow-hidden">
                  <div className="relative min-w-lg">
                     <div className="absolute top-10 left-0 bg-white rounded-xl shadow-md px-5 py-3 z-20 hidden sm:block">
                        <p className="text-[0.8rem] font-semibold text-slate-700 leading-snug">
                           128 jobs match
                           <br/>
                           your profile
                        </p>
                        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45"/>
                     </div>
                     <img 
                        src="/images/promo.png"   
                        alt="Stay updated with job alerts" 
                        className="w-72 md:w-92 z-20" />
                     <div className="absolute size-40 bg-teal-500 opacity-30 rounded-full translate-y-1/2 bottom-0 right-1/3 z-10" />
                     <div className="absolute size-50 bg-teal-400 opacity-20 rounded-full translate-y-1/2 bottom-0 right-1/3 z-10" />
                     <div className="absolute size-60 bg-teal-300 opacity-15 rounded-full translate-y-1/2 bottom-0 right-1/3 z-10" />
                  </div>
               </div>
            </div>
         </Container>
      </section>
   )
}

export default PromoSection;