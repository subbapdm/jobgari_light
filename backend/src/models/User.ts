import mongoose, { type Document } from "mongoose";

export interface IUser extends Document {
   _id: mongoose.Types.ObjectId;
   name: string;
   email: string;
   password: string;
   avatar?: string;
   role: "jobseeker" | "employer" | "admin";
   isVerified: boolean;
   createdAt: string;
   updatedAt: string;
}

const userSchema = new mongoose.Schema<IUser>({
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