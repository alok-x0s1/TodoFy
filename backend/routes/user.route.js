import express from "express";
import {
	editUserProfile,
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
router.route("/profile").get(isLoggedIn, getUserProfile);
router.route("/profile/edit").patch(isLoggedIn, editUserProfile);

export default router;
