import mongoose, { Schema } from "mongoose";

const companySchema = new mongoose.Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   name: {
      type: String,
      required: true,
      trim: true
   },
   logo: {
      type: String,
      default: null
   },
   location: {
      type: Schema.Types.ObjectId,
      ref: "Location"
   },
   isVerified: {
      type: Boolean,
      default: false
   }
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company;