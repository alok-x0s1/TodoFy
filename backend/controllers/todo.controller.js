import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";
import { todoZodSchema } from "../utils/zodValidation.js";

const createTodo = async (req, res) => {
	try {
		const { title, description, isCompleted } = req.body;
		const user = req.user;
		const ownerId = user._id.toString();
		const isValid = todoZodSchema.safeParse({
			title,
			description,
			isCompleted,
			owner: ownerId,
		});

		if (!isValid.success) {
			return res.status(400).json({
				message: "Validation error",
				errors: isValid.error.errors,
			});
		}

		const todo = await Todo.create({
			title,
			description,
			isCompleted,
			owner: user._id,
		});

		if (!todo) {
			return res
				.status(500)
				.send("Internal server error :: Error while creating the todo");
		}

		const updateUser = await User.findByIdAndUpdate(
			ownerId,
			{ $push: { todos: todo._id } },
			{ new: true, runValidators: true }
		);
		if (!updateUser) {
			return res
				.status(500)
				.send("Internal server error :: Error while adding the todo");
		}

		res.status(200).json({ message: "Todo created successfully", todo });
	} catch (error) {
		return res.status(500).send("Server error. Please try again later.");
	}
};

const deleteTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const existedTodo = await Todo.findById(id);

		if (!existedTodo) {
			return res.status(404).send("Todo not found with the given id.");
		}

		const todo = await Todo.findByIdAndDelete(id);

		if (!todo) {
			return res
				.status(500)
				.send("Internal server error :: Error while deleting the todo");
		}

		res.status(200).json({ message: "Todo deleted successfully", todo });
	} catch (error) {
		return res.status(500).send("Server error. Please try again later.");
	}
};

const getAllTodos = async (req, res) => {
	try {
		const user = req.user;
		const ownerId = user._id.toString();
	
		const todos = await Todo.find({
			owner: ownerId
		})
	
		if(todos.length <= 0) {
			return res
					.status(404)
					.send("Todo not found");
		}
	
		res.status(200).send(todos)
	} catch (error) {
		return res.status(500).send("Server error. Please try again later.");
	}
};

export { createTodo, deleteTodo, getAllTodos };
