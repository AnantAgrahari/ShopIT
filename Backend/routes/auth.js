import express from "express";
import { loginUser, logoutUser, registerUser, forgotPassword, resetPassword } from "../controllers/authControllers.js";
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
export default router;