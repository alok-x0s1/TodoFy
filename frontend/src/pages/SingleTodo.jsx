import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

export default function SingleTodo() {
	const { id } = useParams();
	const navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_URL;
	const userToken = useSelector((state) => state.auth.userData?.token);
	const [todo, setTodo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getTodo = async () => {
			try {
				const response = await axios.get(`${apiUrl}/todos/${id}`, {
					headers: { Authorization: `Bearer ${userToken}` },
				});
				setTodo(response.data.todo);
			} catch (error) {
				setError(error.response?.data.message || "An error occurred.");
			} finally {
				setLoading(false);
			}
		};

		getTodo();
	}, [id, apiUrl, userToken]);

	const handleEdit = () => {
		navigate(`/todos/edit/${todo._id}`);
	};

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(
				`${apiUrl}/todos/delete-todo/${id}`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			if (res.data.success) {
				navigate("/");
			} else {
				throw new Error(res.data.error);
			}
		} catch (error) {
			setError(error.response?.data);
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white p-6 font-serif">
			{error ? (
				<div className="absolute top-8 left-1/2 -translate-x-1/2 p-4 bg-red-600 text-white rounded">
					{error.error || error.message}
				</div>
			) : null}
			<div className="max-w-4xl mx-auto">
				<button
					onClick={handleBack}
					className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mb-4"
				>
					Back
				</button>
				<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
					<h1 className="text-3xl font-bold mb-4">{todo.title}</h1>
					<p className="text-lg mb-6">{todo.description}</p>
					<div
						className={`p-4 rounded-lg w-fit border-t border-b border-l border-red-100 ${
							todo.isCompleted
								? "border-l-4 border-l-green-500"
								: "border-l-4 border-l-red-600"
						}`}
					>
						<p>
							Status:{" "}
							{todo.isCompleted ? "Completed" : "Incomplete"}
						</p>
					</div>
					<div className="flex justify-end mt-6 space-x-4">
						<button
							onClick={handleEdit}
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded"
						>
							<FaEdit />
						</button>
						<button
							onClick={() => handleDelete(todo._id)}
							className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-5 rounded"
						>
							<FaTrash />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
