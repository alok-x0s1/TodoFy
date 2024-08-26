import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isCompleted, setIsCompleted] = useState(false);

	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const { id } = useParams();
	const userToken = useSelector((state) => state.auth.userData?.token);

	useEffect(() => {
		setTitle("");
		setDescription("");
		setIsCompleted(false);
		setResponse(null);
		setError(null);
		setLoading(true);

		if (!userToken) {
			navigate("/login");
			return;
		}
		const getTodo = async () => {
			try {
				const response = await axios.get(`${apiUrl}/todos/${id}`, {
					headers: { Authorization: `Bearer ${userToken}` },
				});
				setTitle(response.data.todo.title);
				setDescription(response.data.todo.description);
				setIsCompleted(response.data.todo.isCompleted);
			} catch (error) {
				setError(error.response?.data.message || "An error occurred.");
			} finally {
				setLoading(false);
			}
		};

		getTodo();
	}, []);

	const handleUpdateTodo = async (e) => {
		e.preventDefault();

		setLoading(true);
		setError(null);
		const data = {
			title,
			description,
			isCompleted,
		};
		try {
			const res = await axios.patch(
				`${apiUrl}/todos/update-todo/${id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			setResponse(res.data);
			if (res.data.success) {
				navigate(-1);
			}
		} catch (error) {
			setError(error.response?.data);
		} finally {
			setLoading(false);
		}
	};

	const handleNavigate = () => {
		navigate(-1);
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white flex items-center justify-center font-serif">
			{error ? (
				<div className="absolute top-8 left-1/2 -translate-x-1/2 p-4 bg-red-600 text-white rounded">
					{error.error || error.message}
				</div>
			) : null}
			<div className="w-full max-w-lg p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
				<button
					onClick={handleNavigate}
					className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4"
				>
					Back to Home
				</button>
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-white">
						Update To-Do
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleUpdateTodo}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="title" className="sr-only">
								Title
							</label>
							<input
								id="title"
								name="title"
								type="text"
								required
								className="relative block w-full px-3 py-2 border border-gray-700 rounded-t-md placeholder-gray-500 text-gray-300 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="description" className="sr-only">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								required
								className="relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-300 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className="flex items-center">
							<input
								id="isCompleted"
								name="isCompleted"
								type="checkbox"
								className="w-4 mt-2 h-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500"
								checked={isCompleted}
								onChange={(e) =>
									setIsCompleted(e.target.checked)
								}
							/>
							<label
								htmlFor="isCompleted"
								className="ml-2 mt-2 text-sm text-gray-400"
							>
								Completed
							</label>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{loading ? "Loading..." : "Update To-Do"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditTodo;
