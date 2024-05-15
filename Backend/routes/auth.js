import express from "express";
import { loginUser, logoutUser, registerUser, forgotPassword, resetPassword , getUserProfile, updatePassword, updateProfile} from "../controllers/authControllers.js";
import {isAuthenticatedUser} from "../middlewares/auth.js";
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserProfile);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
export default router;