import express from "express";
import { getCompanies } from "../controller/companyController";


const router = express.Router();

router.get("/", getCompanies);

export default router;