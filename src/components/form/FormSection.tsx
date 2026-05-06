import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FormSectionProps{
   title?: string;
   subtitle?: string;
   icon?: LucideIcon;
   children: React.ReactNode;
   button?: React.ReactNode;
   className?: string;
}

const FormSection = ({ children, title, subtitle, icon: Icon, button, className }: FormSectionProps) => {
   return (
      <section className={cn("bg-white", className)}>
         {(title || subtitle) && (
            <div className="flex items-center justify-between gap-3">
               <div className="flex items-center justify-between gap-2">
                  {Icon ? (
                     <div className="size-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                        <Icon className="size-5 text-teal-600" />
                     </div>
                  ) : null}
                  <div>
                     <h4 className="text-md font-semibold text-foreground">{title}</h4>
                     {subtitle && (
                        <p className="text-xs text-gray-400">{subtitle}</p>
                     )}
                  </div>
               </div>
               {button}
            </div>
         )}
         {children}
      </section>
   )
}

export default FormSection;