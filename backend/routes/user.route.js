import express from "express";
import {
	loginUser,
	logoutUser,
	signupUser,
} from "../controllers/user.controller";
const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;