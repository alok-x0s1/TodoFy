import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
	})
);

// Imports
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

export { app };
