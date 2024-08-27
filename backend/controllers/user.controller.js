import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import {
	generateHashedPassword,
	verifyPassword,
} from "../utils/hashPassword.js";
import {
	loginSchema,
	signupSchema,
	updateUserSchema,
} from "../utils/zodValidation.js";

const signupUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const isValid = signupSchema.safeParse({ username, email, password });
		if (!isValid.success) {
			return res.status(400).json({
				success: false,
				message: "Validation error",
				error: isValid.error.issues[0].message,
			});
		}

		const existedUser = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (existedUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists.",
			});
		}

		const hashedPassword = await generateHashedPassword(password);
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		const createdUser = await User.findById(newUser._id);
		if (!createdUser) {
			return res.status(500).json({
				success: false,
				message: "Error while creating the user",
			});
		}

		const token = generateToken({
			_id: createdUser._id,
			username: createdUser.username,
			email: createdUser.email,
		});

		const { password: _, todos: _todos, ...user } = createdUser.toObject();
		user.token = token;

		res.cookie("token", token).json({
			success: true,
			message: "User created successfully",
			user,
			token: token,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const isValid = loginSchema.safeParse({ email, password });

		if (!isValid.success) {
			return res.status(400).json({
				success: false,
				message: "Validation error",
				error: isValid.error.issues[0].message,
			});
		}

		const existedUser = await User.findOne({ email });
		if (!existedUser) {
			return res.status(400).json({
				success: false,
				message: "User with email not exist.",
			});
		}

		const isPasswordCorrect = await verifyPassword(
			password,
			existedUser.password
		);
		if (!isPasswordCorrect) {
			return res.status(400).json({
				success: false,
				message: "Incorrect password. Please try again",
				error: "Invalid credentials",
			});
		}

		const token = generateToken({
			_id: existedUser._id,
			username: existedUser.username,
			email: existedUser.email,
		});

		const { password: _, ...user } = existedUser.toObject();
		user.token = token;
		res.cookie("token", token).json({
			success: true,
			message: "User login successfully",
			user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

const logoutUser = async (_, res) => {
	try {
		return res.status(200).clearCookie("token").json({
			success: true,
			message: "Logged out successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
			.select("-password")
			.populate("todos");

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		return res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

const editUserProfile = async (req, res) => {
	try {
		const userId = req.user._id;
		const { email, username } = req.body;

		const isValid = updateUserSchema.safeParse({ email, username });
		if (!isValid.success) {
			return res.status(400).json({
				success: false,
				message: "Validation error",
				error: isValid.error.issues[0].message,
			});
		}

		const existingUserWithEmail = await User.findOne({ email });
		if (
			existingUserWithEmail &&
			existingUserWithEmail._id.toString() !== userId.toString()
		) {
			return res.status(400).json({
				success: false,
				message: "Email already exists.",
			});
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				email,
				username,
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(500).json({
				success: false,
				message: "Error while updating the user",
			});
		}

		return res.status(200).json({
			success: true,
			message: "User profile updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

export { signupUser, loginUser, logoutUser, getUserProfile, editUserProfile };
