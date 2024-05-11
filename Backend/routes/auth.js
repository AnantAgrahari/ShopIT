import express from "express";
import { loginUser, logoutUser, registerUser, forgotPassword } from "../controllers/authControllers.js";
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
export default router;