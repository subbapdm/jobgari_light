import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
   const navigate = useNavigate();

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Jobs</h2>
               <p className="text-sm text-slate-400">Manage your jobs</p>
            </div>
            <Button onClick={() => navigate("/admin/jobs/create")} className="bg-blue-500 min-h-10 min-w-30">Create Job</Button>
         </div>

         <div className="bg-white rounded-xl">

         </div>
      </div>
   )
}

export default Jobs;