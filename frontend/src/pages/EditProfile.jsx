import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_URL;
	const userToken = useSelector((state) => state.auth.userData?.token);

	if (!userToken) {
		navigate("/login");
		return;
	}

	useEffect(() => {
		setEmail("");
		setUsername("");
		setResponse(null);
		setError(null);
		setLoading(true);

		const getProfile = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await axios.get(`${apiUrl}/users/profile`, {
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});
				if (res.data.success) {
					setUsername(res.data.user.username);
					setEmail(res.data.user.email);
				}
			} catch (error) {
				setError(error.response?.data.message || "An error occurred.");
			} finally {
				setLoading(false);
			}
		};

		getProfile();
	}, []);

	const handleUpdate = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const data = {
			username,
			email,
		};

		try {
			const res = await axios.patch(
				`${apiUrl}/users/profile/edit`,
				data,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
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
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 font-serif">
			{error ? (
				<div className="absolute top-8 left-1/2 -translate-x-1/2 p-4 bg-red-600 text-white rounded">
					{error.error || error.message}
				</div>
			) : null}
			<div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg animate-fade-in">
				<button
					onClick={handleNavigate}
					className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4"
				>
					Back
				</button>
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-white">
						Update your account
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Enter your credentials below
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleUpdate}>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="username" className="sr-only">
								User name
							</label>
							<input
								id="username"
								name="username"
								min={8}
								type="username"
								required
								className="relative block w-full px-3 py-2 border border-gray-700 rounded-t-md placeholder-gray-500 text-gray-300 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								required
								className="relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-300 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span className="absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							{loading ? "Loading..." : "Update Profile"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
