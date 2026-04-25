import type { LucideIcon } from "lucide-react";

interface FormSectionProps{
   title?: string;
   subtitle?: string;
   icon?: LucideIcon;
   children: React.ReactNode;
   button?: React.ReactNode;
}

const FormSection = ({ children, title, subtitle, icon: Icon, button }: FormSectionProps) => {
   return (
      <section className="bg-white p-5 border border-gray-200 space-y-6 rounded-md">
         {title && subtitle && (
            <div className="flex items-center justify-between gap-3 mb-6">
               <div className="flex items-center justify-between gap-2">
                  {Icon ? (
                     <div className="size-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                        <Icon className="size-5 text-teal-600" />
                     </div>
                  ) : null}
                  <div>
                     <h4 className="text-md font-semibold text-foreground">{title}</h4>
                     <p className="text-[0.7rem] text-gray-400">{subtitle}</p>
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