import express from "express";
import { loginUser, logoutUser, registerUser, forgotPassword, resetPassword , getUserProfile, updatePassword} from "../controllers/authControllers.js";
import {isAuthenticatedUser} from "../middlewares/auth.js";
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserProfile);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
export default router;