import express from "express";
import { SignIn, SignUp } from "../controller/authController";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);

export default router;