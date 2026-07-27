import { cn } from "@/lib/utils";


const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
   return (
      <div className={cn("container mx-auto", className)}>
         {children}
      </div>
   )
}

export default Container;