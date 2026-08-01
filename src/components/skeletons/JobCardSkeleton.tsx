

const JobCardSkeleton = () => {
   return (
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4">
         <div className="flex items-center gap-3">
            <div className="size-11 shrink-0 animate-pulse rounded-full bg-slate-100" />
            <div className="flex-1 space-y-2">
               <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
               <div className="h-2.5 w-14 animate-pulse rounded bg-slate-100" />
            </div>
         </div>
         <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
         <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
         <div className="flex gap-1.5">
            <div className="h-6 w-14 animate-pulse rounded-md bg-slate-100" />
            <div className="h-6 w-16 animate-pulse rounded-md bg-slate-100" />
            <div className="h-6 w-12 animate-pulse rounded-md bg-slate-100" />
         </div>
         <div className="mt-auto h-4 w-28 animate-pulse rounded bg-slate-100" />
      </div>
   )
}

export default JobCardSkeleton;