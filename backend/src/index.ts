import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes";


const app = express();

app.use(express.json());
app.use(cors({
   origin: 'http://localhost:8080'
}));

app.use("/api/jobs", jobRoutes);

// Health check
app.get("/api/health", (req, res) => {
   res.json({ 
      status: "ok",
      timestamp: new Date().toISOString()
   })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})