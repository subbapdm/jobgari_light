import express from "express";
import { getLocations } from "../controller/locationController";

const router = express.Router();

router.get("/", getLocations);

export default router;