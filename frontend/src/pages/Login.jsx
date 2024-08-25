import axios from "axios";
import { useState } from "react";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const apiUrl = import.meta.env.VITE_API_URL;

	const handleLogin = async (e) => {
		e.preventDefault();

		setLoading(true);
		setError(null);
		const data = {
			email,
			password,
		};
		try {
			const res = await axios.post(`${apiUrl}/users/login`, data);
			setResponse(res.data);
			if (res.data.success) {
				dispatch(
					login(res.data.user)
				);
				navigate(`/`);
			}
		} catch (error) {
			setError(error.response?.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 font-serif">
			{error ? (
				<div className="absolute top-8 left-1/2 -translate-x-1/2 p-4 bg-red-600 text-white rounded">
					{error.error || error.message}
				</div>
			) : null}
			<div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg animate-fade-in">
				<Link
					to={"/"}
					className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4"
				>
					Back to Home
				</Link>
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-white">
						Sign in to your account
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Enter your credentials below
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleLogin}>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="relative block w-full px-3 py-2 border border-gray-700 rounded-t-md placeholder-gray-500 text-gray-300 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								min={8}
								type="password"
								autoComplete="current-password"
								required
								className="relative block w-full px-3 py-2 border border-gray-700 rounded-b-md placeholder-gray-500 text-gray-300 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember_me"
								name="remember_me"
								type="checkbox"
								className="w-4 h-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500"
							/>
							<label
								htmlFor="remember_me"
								className="block ml-2 text-sm text-gray-400"
							>
								Remember me
							</label>
						</div>
						<div className="text-sm">
							<Link
								to={"/signup"}
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Don&#39;t have an account?
							</Link>
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
							{loading ? "Loading..." : "Sign in"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
