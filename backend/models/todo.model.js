import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;