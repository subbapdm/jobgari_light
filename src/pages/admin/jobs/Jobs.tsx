import FormSelect from "@/components/form/FormSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { jobsService } from "@/services/jobService";
import { useQuery } from "@tanstack/react-query";
import { Download, Eye, MoreHorizontalIcon, Plus, RotateCcw, Search, Trash, Trash2 } from "lucide-react";
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
   const [selectedItems, setSelectedItems] = useState<string[]>([]);

   const navigate = useNavigate();

   const { data, isLoading } = useQuery({
      queryKey: ["jobs"],
      queryFn: () => jobsService.getJobs(),
      select: (res) => ({
         jobs: res.data,
         pagination: res.pagination
      })
   });

   const selectedAll = data?.jobs.length > 0 && data?.jobs.length === selectedItems.length;

   const selectAll = () => {
      if(selectedAll){
         setSelectedItems([]);
      } else {
         setSelectedItems(data?.jobs.map((job) => job._id));
      }
   };

   const handleSelect = (id: string) => {
      if(selectedItems.includes(id)){
         return setSelectedItems(prev => prev.filter(item => item !== id))
      } else {
         return setSelectedItems(prev => ([ ...prev, id ]));
      }
   }

   const handleTypeChange = (val: string) => {
      setJobType(val);
   }
   
   const handleStatusChange = (val: string) => {
      setStatus(val);
   }


   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div className="space-y-0.5">
               <h2 className="text-2xl font-bold text-slate-800">Manage jobs</h2>
               <p className="text-sm text-slate-400">Manage your job postings and track applications.</p>
            </div>
            <Button onClick={() => navigate("/admin/jobs/create")} className="bg-teal-600 hover:bg-teal-600/90 min-h-11 px-4">
               <Plus className="size-5" />
               Post job
            </Button>
         </div>

         <div className="flex flex-col lg:flex-row items-stretch sm:items-center gap-3">
            <div className="flex w-full lg:w-1/3  gap-3">
               <FormSelect
                  value={jobType}
                  onChange={handleTypeChange}
                  options={TYPE_OPTIONS}
                  label="Types"
                  placeholder="All Types"
                  className="w-full min-h-11 rounded-sm bg-white"
               />
               <FormSelect
                  value={status}
                  onChange={handleStatusChange}
                  options={STATUS_OPTIONS}
                  label="Status"
                  placeholder="All Statuses"
                  className="w-full min-h-11 rounded-sm bg-white"
               />
            </div>
            <div className="flex w-full justify-between lg:w-2/3 gap-3">
               <div className="relative max-w-md xl:max-w-xl flex-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                     placeholder="Search Jobs..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="w-full pl-9 min-h-11 rounded-sm bg-white focus-visible:border focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400"
                  />
               </div>
               <div className="">
                  <Button variant="outline" className="min-h-11 bg-white cursor-pointer px-4 sm:px-6">
                     <Download className="size-4" />
                     <span className="hidden sm:block">Download</span>
                  </Button>
               </div>
            </div>
         </div>
         
         <div className="bg-white overflow-x-auto rounded-lg relative">
         
            <table className="w-full mx-auto">
               <thead className="border-b border-dashed border-gray-200 text-gray-500 text-left text-[0.85rem]">
                  <tr>
                     <th className="p-4">
                        <Checkbox
                           checked={selectedAll}
                           onCheckedChange={() => selectAll()}
                           disabled={data?.jobs.length === 0}
                           className="size-5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                        />
                     </th>
                     {selectedItems.length > 0 ? (
                        <td colSpan={12} className="p-2.5">
                           <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                 {selectedItems.length} selected
                              </span>
                              <div className="flex items-center gap-2">
                                 <Button onClick={() => setSelectedItems([])} variant="outline" className="min-h-10 px-3 bg-white text-gray-500">
                                    <RotateCcw />
                                    Clear
                                 </Button>
                                 <Button onClick={() => {}} disabled={false} className="min-h-10 px-3 bg-red-500">
                                    <Trash2 className="size-4 mr-2" />
                                    Delete
                                 </Button>
                              </div>
                           </div>
                        </td>
                     ) : (
                        <>
                           <th className="p-4 font-medium">Job</th>
                           <th className="p-4 font-medium">Company</th>
                           <th className="p-4 font-medium hidden md:table-cell">Type</th>
                           <th className="p-4 font-medium">Status</th>
                           <th className="p-4 font-medium">Applications</th>
                           <th className="p-4 font-medium">Deadline</th>
                           <th className="p-4 font-medium">Actions</th>
                        </>
                     )}
                  </tr>
               </thead>
               <tbody className="divide-y divide-dashed divide-gray-200">

                 {data?.jobs.map((job) => (
                     <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                           <Checkbox
                              checked={selectedItems.includes(job._id)}
                              onCheckedChange={() => handleSelect(job._id)}
                              className="size-5 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                           />
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800 w-px whitespace-nowrap">
                           <div className="flex items-center gap-3">
                              <div className="size-10 bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-300 rounded-full p-0.5 shrink-0">
                                 {job.company.logo ? (
                                    <img src="" />
                                 ) : (
                                    <span>LG</span>
                                 )}
                              </div>
                              <div className="flex flex-col">
                                 <strong className="leading-tight text-[0.9rem]">{job.title}</strong>
                                 <span className="text-xs text-gray-400">{job.category.name}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                           <strong className="text-[0.9rem] font-semibold text-slate-600">{job.company.name}</strong>
                        </td>
                        <td className="px-4 py-3 text-[0.8rem] font-medium text-gray-400 capitalize hidden md:table-cell">{job.jobType}</td>
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
                                 <Button variant="ghost" size="icon" className="size-8 cursor-pointer text-gray-400">
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