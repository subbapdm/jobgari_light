import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   slug: {
      type: String,
      unique: true
   }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;