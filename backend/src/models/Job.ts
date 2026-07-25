import mongoose, { Schema } from "mongoose";
import { EDUCATION_LEVELS, EXPERIENCE_LEVELS, JOB_STATUSES, JOB_TYPES, SALARY_CURRENCIES, SALARY_PERIODS, WORK_MODES } from "../constants/jobEnums";

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
      enum: JOB_TYPES,
      required: true
   },
   workMode: {
      type: String,
      enum: WORK_MODES,
      required: true
   },
   salary: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
      currency: { type: String, enum: SALARY_CURRENCIES, default: "USD" },
      period: { type: String, enum: SALARY_PERIODS, default: "monthly"},
      undisclosed: { type: Boolean, default: false }
   },
   experience: {
      type: String,
      enum: EXPERIENCE_LEVELS,
      required: true
   },
   education: {
      type: String,
      enum: EDUCATION_LEVELS
   },
   skills: [
      {
         type: String,
         trim: true
      }
   ],
   status: {
      type: String,
      enum: JOB_STATUSES,
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