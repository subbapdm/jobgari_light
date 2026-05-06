import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true
   },
   deadline: {
      type: Date,
   },
   title: {
      type: String,
      required: true,
      trim: true
   },
   slug: {
      type: String,
      required: true,
      unique: true
   },
   description: {
      type: String,
      required: true
   },
   category:  {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
   },
   location: {
      type: Schema.Types.ObjectId,
      ref: "Location"
   },
   jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true
   },
   workMode: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      required: true
   },
   salary: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
      currency: { type: String, enum: ["USD", "EUR", "GBP"], default: "USD" },
      period: { type: String, enum: ["hourly", "monthly", "annually"], default: "monthly"},
      undisclosed: { type: Boolean, default: false }
   },
   experience: {
      type: String,
      enum: ["entry", "junior", "mid", "senior", "lead", "executive"],
      required: true
   },
   education: {
      type: String,
      enum: ["high-school", "bachelor", "master", "phd", "none"]
   },
   skills: [
      {
         type: String,
         trim: true
      }
   ],
   status: {
      type: String,
      enum: ["draft", "active", "expired"],
      default: "active"
   },
   isFeatured: {
      type: Boolean,
      default: false
   },
   isUrgent: {
      type: Boolean,
      default: false
   },
   totalApplications: {
      type: Number,
      default: 0
   }
}, { timestamps: true });

jobSchema.index({ title: "text", description: "text", skills: "text" });
jobSchema.index({ status: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ workMode: 1 });
jobSchema.index({ experience: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ isFeatured: 1, createdAt: -1 });

// Auto-generate slug from title
jobSchema.pre("save", function(){
   if(this.isModified("title")){
      this.slug = (this.title as string)
         .toLowerCase()
         .replace(/[^a-z0-9\s]/g, "")
         .replace(/\s+/g, "-") + "-" + Date.now();
   }
});

const Job = mongoose.model("Job", jobSchema);

export default Job;