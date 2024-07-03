import jwt from "jsonwebtoken";

const generateToken = (user) => {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
	return token;
};

export default generateToken;