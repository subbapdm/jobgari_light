import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
   },
   password: {
      type: String,
      required: true,
      trim: true
   },
   avatar: {
      type: String,
      default: null
   },
   role: {
      type: String,
      enum: ["jobseeker", "employer", "admin"],
      default: "jobseeker"
   },
   isVerified: {
      type: Boolean,
      default: false
   }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;