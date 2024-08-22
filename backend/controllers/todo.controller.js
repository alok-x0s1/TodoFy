import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";
import { todoZodSchema } from "../utils/zodValidation.js";

const createTodo = async (req, res) => {
	try {
		const { title, description, isCompleted } = req.body;
		const ownerId = req.user.id;
		const isValid = todoZodSchema.safeParse({
			title,
			description,
			isCompleted,
			owner: ownerId,
		});

		if (!isValid.success) {
			return res.status(400).json({
				success: false,
				message: "Validation error",
				error: isValid.error.issues[0].message,
			});
		}

		const todo = await Todo.create({
			title,
			description,
			isCompleted,
			owner: req.user._id,
		});

		if (!todo) {
			return res.status(500).json({
				success: false,
				message: "Error while creating the todo",
			});
		}

		const updateUser = await User.findByIdAndUpdate(
			ownerId,
			{ $push: { todos: todo._id } },
			{ new: true, runValidators: true }
		);
		if (!updateUser) {
			return res.status(500).json({
				success: false,
				message: "Error while updating the user",
			});
		}

		res.status(200).json({
			success: true,
			message: "Todo created successfully",
			todo,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

const updateTodo = async (req, res) => {
	try {
		const { title, description, isCompleted } = req.body;
		const { id } = req.params;
		const ownerId = req.user.id;
		const isValid = todoZodSchema.safeParse({
			title,
			description,
			isCompleted,
			owner: ownerId,
		});

		if (!isValid.success) {
			return res.status(400).json({
				success: false,
				message: "Validation error",
				error: isValid.error.issues[0].message,
			});
		}

		const todo = await Todo.findByIdAndUpdate(
			id,
			{ title, description, isCompleted },
			{ new: true, runValidators: true }
		);

		if (!todo) {
			return res.status(404).json({
				success: false,
				message: "Todo not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Todo updated successfully",
			todo,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

const getSingleTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const ownerId = req.user.id;
		const todo = await Todo.findById(id).populate("owner", "username");

		if (!todo) {
			return res.status(404).json({
				success: false,
				message: "Todo not found",
			});
		}
		if (todo.owner._id.toString() !== ownerId) {
			return res.status(403).json({
				success: false,
				message: "Unauthorized access",
			});
		}

		res.status(200).json({
			success: true,
			message: "Todo retrieved successfully",
			todo,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

const deleteTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const existedTodo = await Todo.findById(id);

		if (!existedTodo) {
			return res.status(404).json({
				success: false,
				message: "Todo not found",
			});
		}

		const todo = await Todo.findByIdAndDelete(id);

		if (!todo) {
			return res.status(500).json({
				success: false,
				message: "Error while deleting the todo",
			});
		}

		res.status(200).json({
			success: true,
			message: "Todo deleted successfully",
			todo,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

const getAllTodos = async (req, res) => {
	try {
		const todos = await Todo.find({
			owner: req.user._id,
		});

		if (todos.length <= 0) {
			return res.status(404).json({
				success: false,
				message: "No todos found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Todos fetched successfully",
			todos,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Please try again later.",
			error: error.message,
		});
	}
};

export { createTodo, updateTodo, deleteTodo, getAllTodos, getSingleTodo };
