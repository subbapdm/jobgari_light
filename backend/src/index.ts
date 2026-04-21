import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB";

import jobRoutes from "./routes/jobRoutes";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import locationRoutes from "./routes/locationRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cookieParser());
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/locations", locationRoutes);

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