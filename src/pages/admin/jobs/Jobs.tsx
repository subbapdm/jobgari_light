import FormSelect from "@/components/form/FormSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { jobsService } from "@/services/jobService";
import { useQuery } from "@tanstack/react-query";
import { Download, Eye, MoreHorizontalIcon, Plus, Search, Trash } from "lucide-react";
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
               <h2 className="text-2xl font-bold text-slate-800">Manage jobs</h2>
               <p className="text-sm text-slate-400">Manage your job postings and track applications.</p>
            </div>
            <Button onClick={() => navigate("/admin/jobs/create")} className="bg-teal-600 hover:bg-teal-600/90 min-h-11 px-4">
               <Plus className="size-5" />
               Post job
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
                  className="w-full min-h-11 rounded-sm bg-white"
               />
            </div>
            <div className="flex-1">
               <FormSelect
                  value={status}
                  onChange={handleStatusChange}
                  options={STATUS_OPTIONS}
                  label="Status"
                  placeholder="All Statuses"
                  className="w-full min-h-11 rounded-sm bg-white"
               />
            </div>
            <div className="relative flex-2">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
               <Input
                  placeholder="Search Jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 min-h-11 rounded-sm bg-white"
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
               <thead className="border-b border-dashed border-gray-200 text-gray-500 text-left text-[0.85rem]">
                  <tr>
                     <th className="p-4 font-medium">Job</th>
                     <th className="p-4 font-medium">Company</th>
                     <th className="p-4 font-medium">Type</th>
                     <th className="p-4 font-medium">Status</th>
                     <th className="p-4 font-medium">Applications</th>
                     <th className="p-4 font-medium">Deadline</th>
                     <th className="p-4 font-medium">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-dashed divide-gray-200">

                 {data?.jobs.map((job) => (
                     <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                           <Checkbox
                              checked={false}
                              onCheckedChange={() => {}}
                              className="h-5 w-5 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                           />
                        </td>
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
                                 <strong className="leading-tight text-[1rem]">{job.title}</strong>
                                 <span className="text-xs text-gray-400">{job.category.name}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                           <strong className="text-[0.9rem] font-semibold text-slate-600">{job.company.name}</strong>
                        </td>
                        <td className="px-4 py-3 text-[0.8rem] font-medium text-gray-500 capitalize">{job.jobType}</td>
                        <td className="px-4 py-3">
                           {job.status === "active" ? (
                              <Badge className="min-h-6 px-2.5 bg-teal-100 text-teal-600">{job.status}</Badge>
                           ) : (
                              <Badge className="min-h-6 px-2.5 bg-slate-100 text-slate-500">{job.status}</Badge>
                           )}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                           <Badge className="min-h-6 bg-slate-100 text-slate-500 font-semibold">443</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                           {new Date(Date.now()).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                                    <MoreHorizontalIcon />
                                    <span className="sr-only">Open menu</span>
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                 <DropdownMenuItem onClick={() => {}}>
                                    <Eye size={13} />
                                    View Profile
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem variant="destructive" onClick={() => {}}>
                                    <Trash size={13} />
                                    Delete
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
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