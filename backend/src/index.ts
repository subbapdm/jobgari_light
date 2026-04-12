import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/connectDB";

const app = express();

app.use(express.json());
app.use(cors({
   origin: 'http://localhost:5173'
}));

app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);


// Health check
app.get("/api/health", (req, res) => {
   res.json({ 
      status: "ok",
      timestamp: new Date().toISOString()
   })
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
   })
})