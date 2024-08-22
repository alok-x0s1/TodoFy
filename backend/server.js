import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./index.js";

const PORT = process.env.PORT || 8000;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is started at port : ${PORT}`);
		});
	})
	.catch((error) => {
		console.log("mongoDb connection failed !!", error);
	});