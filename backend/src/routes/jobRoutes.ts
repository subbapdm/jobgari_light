import express from "express";
import { getJobs } from "../controller/jobController";

const router = express.Router();

router.get("/", getJobs);

export default router;