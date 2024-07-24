import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import NotFound from "./NotFound";

const Profile = () => {
	const todos = [
		{
			id: 1,
			title: "Todo 1",
			description: "Description for Todo 1",
			isCompleted: false,
		},
		{
			id: 2,
			title: "Todo 2",
			description: "Description for Todo 2",
			isCompleted: true,
		},
		{
			id: 3,
			title: "Todo 3",
			description: "Description for Todo 3",
			isCompleted: false,
		},
	];

	const handleEditInfo = () => {
		// Handle edit info logic here
	};

	const { username } = useParams();

	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const apiUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`${apiUrl}/api/v1/users/profile/${username}`
				);
				setData(res.data);
			} catch (error) {
				if (error.response && error.response.status === 404) {
					setError("404");
				} else {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [username, apiUrl]);

	if (loading) {
		return <Loader />;
	}

  if (error === "404") {
    return <NotFound />;
  }

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center py-12">
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
					</div>
					<button
						onClick={handleEditInfo}
						className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
					>
						Edit Info
					</button>
				</div>
				<div className="mt-4">
					<p className="text-gray-400">Email: {data.email}</p>
				</div>
				<div className="mt-6">
					<h3 className="text-2xl font-bold mb-4">To-Dos</h3>
					<ul className="space-y-4">
						{data.todos.map((todo) => (
							<li
								key={todo.id}
								className={`p-4 rounded-lg shadow-lg ${
									todo.isCompleted
										? "bg-green-700"
										: "bg-gray-800"
								}`}
							>
								<h4 className="text-xl font-bold">
									{todo.title}
								</h4>
								<p className="text-gray-400">
									{todo.description}
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
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Profile;
