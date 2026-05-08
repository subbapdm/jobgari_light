

export interface Job{
   _id: string;
   title: string;
   slug: string;
   company: { _id: string; name: string; logo?: string };
   category: { _id: string, name: string };
   jobType: "full-time" | "part-time" | "contract" | "internshipt";
   workMode: "remote" | "onsite" | "hybrid";
   status: "draft" | "active" | "expired";
   deadline: string;
   isFeatured: boolean;
   isUrgent: boolean;
   createdAt: string;
}