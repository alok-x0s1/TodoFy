import bcrypt from "bcrypt";

const generateHashedPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (error) {
		console.log("GenerateHashedPassword :: Error :: ", error);
		return null;
	}
};

const verifyPassword = async (password, hash) => {
	try {
		const result = await bcrypt.compare(password, hash);
		return result;
	} catch (error) {
		console.log("verifyPassword :: Error :: ", error);
		return null
	}
};

export {
    generateHashedPassword,
    verifyPassword
}