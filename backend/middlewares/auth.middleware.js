import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isLoggedIn = async (req, res, next) => {
	try {
		const token =
			req.cookies?.token ||
			req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			return res.status(401).send("Unauthorized request");
		}

		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const user = await User.findById(decodedToken._id).select("-password");
		req.user = user;
	} catch (error) {
		return res.status(401).send(error?.message || "Invalid access Token");
	} finally {
		next();
	}
};

export default isLoggedIn;