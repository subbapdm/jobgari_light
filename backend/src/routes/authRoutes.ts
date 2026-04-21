import express from "express";
import { getMe, logout, refresh, SignIn, SignUp } from "../controller/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/refresh", protect, refresh); // Protected by cookie
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;