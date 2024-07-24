import express from "express";
import {
	getUserProfile,
	loginUser,
	logoutUser,
	signupUser,
} from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile/:username").get(getUserProfile);

export default router;