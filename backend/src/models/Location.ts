import mongoose, { Schema } from "mongoose";

const locationSchema = new mongoose.Schema({
   state: {
      type: String,
      required: true,
      trim: true
   },
   city: {
      type: String,
      required: true,
      trim: true
   }
}, { timestamps: true });

const Location = mongoose.model("Location", locationSchema);

export default Location;