import FormSelect from "@/components/form/FormSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jobsService } from "@/services/jobService";
import { useQuery } from "@tanstack/react-query";
import { Download, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
   { value: "all", label: "All Statuses" },
   { value: "active", label: "Active" },
   { value: "draft", label: "Draft" },
   { value: "expired", label: "Expired" }
];

const TYPE_OPTIONS = [
   { value: "all", label: "All Types" },
   { value: "full-time", label: "Full-time" },
   { value: "part-time", label: "Part-time" },
   { value: "contract", label: "Contract" },
   { value: "internship", label: "Internship" }
];

const Jobs = () => {
   const [search, setSearch] = useState("");
   const [status, setStatus] = useState("");
   const [jobType, setJobType] = useState("");

   const navigate = useNavigate();

   const { data, isLoading } = useQuery({
      queryKey: ["jobs"],
      queryFn: () => jobsService.getJobs(),
      select: (res) => ({
         jobs: res.data,
         pagination: res.pagination
      })
   });

   console.log(data?.jobs);

   const handleTypeChange = (val: string) => {
      setJobType(val);
   }
   
   const handleStatusChange = (val: string) => {
      setStatus(val);
   }


   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Jobs</h2>
               <p className="text-sm text-slate-400">{""} total jobs</p>
            </div>
            <Button onClick={() => navigate("/admin/jobs/create")} className="bg-teal-600 hover:bg-teal-700 min-h-11">
               <Plus className="size-4" />
               Post Job
            </Button>
         </div>

         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
               <FormSelect
                  value={jobType}
                  onChange={handleTypeChange}
                  options={TYPE_OPTIONS}
                  label="Types"
                  placeholder="All Types"
                  className="w-full min-h-11 rounded-sm"
               />
            </div>
            <div className="flex-1">
               <FormSelect
                  value={status}
                  onChange={handleStatusChange}
                  options={STATUS_OPTIONS}
                  label="Status"
                  placeholder="All Statuses"
                  className="w-full min-h-11 rounded-sm"
               />
            </div>
            <div className="relative flex-2">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
               <Input
                  placeholder="Search Jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 min-h-11 rounded-sm"
               />
            </div>
            <div>
               <Button variant="outline" className="min-h-11 bg-white cursor-pointer px-6">
                  <Download className="size-4" />
                  Download
               </Button>
            </div>
         </div>


         
         <div className="bg-white overflow-x-auto rounded-lg relative">
         
            <table className="w-full mx-auto">
               <thead className="border-b border-dashed border-gray-200 text-gray-400 text-left text-[0.85rem]">
                  <tr>
                     <th className="p-4 font-medium">Job</th>
                     <th className="p-4 font-medium">Company</th>
                     <th className="p-4 font-medium">Type</th>
                     <th className="p-4 font-medium">Status</th>
                     <th className="p-4 font-medium">Deadline</th>
                     <th className="p-4 font-medium">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-dashed divide-gray-200">

                 {data?.jobs.map((job) => (
                     <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">
                           <div className="flex items-center gap-3">
                              <div className="size-10 bg-slate-300 flex items-center justify-center text-lg font-bold text-slate-400 rounded-full p-0.5 shrink-0">
                                 {job.company.logo ? (
                                    <img src="" />
                                 ) : (
                                    <span>LG</span>
                                 )}
                              </div>
                              <div className="flex flex-col">
                                 <strong className="leading-tight">{job.title}</strong>
                                 <span className="text-xs text-gray-400">{job.category.name}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                           <strong className="text-[0.9rem] text-slate-600">{job.company.name}</strong>
                        </td>
                        <td className="px-4 py-3 text-[0.8rem] font-medium text-gray-500 capitalize">{job.jobType}</td>
                        <td className="px-4 py-3">
                           {job.status === "active" ? (
                              <Badge className="min-h-6 px-2.5 bg-teal-100 text-teal-600">{job.status}</Badge>
                           ) : (

                              <Badge className="min-h-6 px-2.5 bg-slate-100 text-slate-500">{job.status}</Badge>
                           )}
                          
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                           {new Date(Date.now()).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">
                        
                        </td>
                     </tr>
                 ))}
                  
               </tbody>
            </table>

         </div>
            

      </div>
   )
}

export default Jobs;