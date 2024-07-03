import mongoose from "mongoose";
import { DB_NAME } from "../config/constants.js";

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGO_DB_URI}/${DB_NAME}`
		);
		console.log(
			`MongoDb connected - DB host : ${connectionInstance.connection.host}`
		);
	} catch (error) {
		console.log("Db connection error : ", error);
		process.exit(1);
	}
};

export default connectDB;