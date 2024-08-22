import express from "express";
import isLoggedIn from "../middlewares/auth.middleware.js";
import {
	createTodo,
	deleteTodo,
	getAllTodos,
	getSingleTodo,
	updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();
router.use(isLoggedIn);

router.route("/create-todo").post(createTodo);
router.route("/update-todo/:id").patch(updateTodo);
router.route("/delete-todo/:id").delete(deleteTodo);
router.route("/all").get(getAllTodos);
router.route("/:id").get(getSingleTodo);

export default router;
