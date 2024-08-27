import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		todos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Todo",
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
