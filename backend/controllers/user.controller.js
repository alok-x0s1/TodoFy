import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import {
	generateHashedPassword,
	verifyPassword,
} from "../utils/hashPassword.js";
import { loginSchema, signupSchema } from "../utils/zodValidation.js";

const signupUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const isValid = signupSchema.safeParse({ username, email, password });
		if (!isValid.success) {
			return res.send(isValid.error);
		}

		const existedUser = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (existedUser) {
			return res
				.status(400)
				.send("User with email or password already exist.");
		}

		const hashedPassword = await generateHashedPassword(password);
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		const createdUser = await User.findById(user._id);
		if (!createdUser) {
			return res
				.status(500)
				.send("Internal server error :: Error while creating the user");
		}

		const token = generateToken({
			_id: user._id,
			username: user.username,
			email: user.email,
		});

		res.cookie("token", token).json({message: "User created successfully", createdUser});
	} catch (error) {
		return res.status(500).send("Server error. Please try again later.");
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const isValid = loginSchema.safeParse({ email, password });

		if (!isValid.success) {
			return res.send(isValid.error);
		}

		const existedUser = await User.findOne({ email });
		if (!existedUser) {
			return res.status(400).send("User with email not exist.");
		}

		const isPasswordCorrect = await verifyPassword(
			password,
			existedUser.password
		);
		if (!isPasswordCorrect) {
			return res.status(400).send("Incorrect password. Please try again");
		}

		const token = generateToken({
			_id: existedUser._id,
			username: existedUser.username,
			email: existedUser.email,
		});

		res.cookie("token", token).json({message: "User login successfully", user: existedUser});
	} catch (error) {
		return res.status(500).send("Server error. Please try again later.");
	}
};
const logoutUser = async (_, res) => {
	res.cookie("token", "");
	res.send("Logout successfully.");
};

export { signupUser, loginUser, logoutUser };