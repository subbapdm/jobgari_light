import express from "express";
import { createJob, getJobs } from "../controller/jobController";

const router = express.Router();

router.get("/", getJobs);
router.post("/", createJob);

export default router;