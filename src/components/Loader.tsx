import { Loader2 } from "lucide-react"

const Loader = () => {
   return (
      <div className="flex items-center justify-center">
         <Loader2 className="size-5 animate-spin" />
      </div>
   )
}

export default Loader