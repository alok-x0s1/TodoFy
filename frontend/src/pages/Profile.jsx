import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { TbUserEdit } from "react-icons/tb";
import { FaTrash } from "react-icons/fa6";

const Profile = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const userToken = useSelector((state) => state.auth.userData?.token);
	const apiUrl = import.meta.env.VITE_API_URL;

	if (!userToken) {
		return <NotFound />;
	}

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await axios.get(`${apiUrl}/users/profile`, {
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});
				if (res.data.success) {
					setData(res.data.user);
				}
			} catch (error) {
				setError(error.response?.data);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [userToken, apiUrl]);

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
				setData((prevData) => ({
					...prevData,
					todos: prevData.todos.filter((t) => t._id !== id),
				}));
			} else {
				throw new Error(res.data.error);
			}
		} catch (error) {
			setError(error.response?.data);
		}
	};

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div className="absolute top-8 left-1/2 -translate-x-1/2 p-4 bg-red-600 text-white rounded">
				{error.error || error.message} : Please login
			</div>
		);
	}
	const remTodos = data.todos.slice(0, 3);

	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center py-12 font-serif">
			{data ? (
				<div className="w-full max-w-4xl p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-3xl font-extrabold">
								Hello {data.username} 👋
							</h2>
							<p className="text-gray-400">
								Here you can view and manage your profile
								information.
							</p>
							<p className="text-sm text-gray-500 mt-2">
								email : {data.email}
							</p>
							<p className="text-sm text-gray-500 mt-2">
								Member since:{" "}
								{moment(data.createdAt).format("MMMM Do, YYYY")}
							</p>
						</div>
						<Link
							to="/profile/edit"
							className="bg-indigo-600 hover:bg-indigo-700 duration-300 text-white font-bold py-3 px-5 rounded text-lg"
						>
							<TbUserEdit />
						</Link>
					</div>
					<div className="mt-6">
						<h3 className="text-2xl font-bold mb-4">
							Here are your some To-Dos
						</h3>
						<ul className="space-y-4">
							{remTodos.map((todo) => (
								<li
									key={todo._id}
									className={`p-4 rounded-lg bg-gray-700 shadow-lg flex justify-between items-center border-r-4 ${
										todo.isCompleted
											? "border-green-500"
											: "border-red-500"
									}`}
								>
									<div>
										<h4 className="text-xl font-bold">
											{todo.title}
										</h4>
										<p className="text-gray-400">
											{todo.description}
										</p>
										<p className="text-sm text-gray-500 mt-2">
											Created:{" "}
											{moment(todo.createdAt).format(
												"MMMM Do, YYYY"
											)}
										</p>
										<p className="text-sm mt-2">
											Status:{" "}
											<span
												className={
													todo.isCompleted
														? "text-green-400"
														: "text-red-400"
												}
											>
												{todo.isCompleted
													? "Completed"
													: "Incomplete"}
											</span>
										</p>
									</div>
									<div className="flex space-x-2">
										<Link
											to={`/todos/edit/${todo._id}`}
											className="bg-indigo-600 hover:bg-indigo-700 duration-300 text-white font-bold py-3 px-5 rounded"
										>
											<FaEdit />
										</Link>
										<button
											onClick={() =>
												handleDelete(todo._id)
											}
											className="bg-red-500 hover:bg-red-600 duration-300 text-white font-bold py-3 px-5 rounded"
										>
											<FaTrash />
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
					{data.todos.length > 3 && (
						<div className="flex justify-center items-center mt-4">
							<Link
								to="/todos"
								className="bg-indigo-600 hover:bg-indigo-700 duration-300 text-white font-bold py-2 px-4 rounded flex items-center"
							>
								View All &#x2935;
							</Link>
						</div>
					)}
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default Profile;
