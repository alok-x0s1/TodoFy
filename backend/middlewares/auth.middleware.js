import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isLoggedIn = async (req, res, next) => {
	try {
		const token =
			req.cookies?.token ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized request",
				errors: { token: "Token is required" },
			});
		}

		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const user = await User.findById(decodedToken._id).select(
			"-password -todos"
		);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized request",
				errors: { token: "User not found" },
			});
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized request",
			errors: { token: "Invalid token" },
		});
	}
};

export default isLoggedIn;
