import express from "express";
import { createJob, getJobs } from "../controller/jobController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, createJob);

export default router;