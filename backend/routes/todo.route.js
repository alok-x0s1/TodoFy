import express from "express";
import isLoggedIn from "../middlewares/auth.middleware.js";
import { createTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.route("/create-todo").post(isLoggedIn, createTodo)
router.route("/delete-todo/:id").delete(isLoggedIn, deleteTodo)

export default router;