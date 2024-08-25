import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbLogin2, TbLogout2 } from "react-icons/tb";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const status = useSelector((state) => state.auth.status);
	const userData = useSelector((state) => state.auth.userData);
	const isLoggedIn = status === true;

	const handleLogout = () => {
		dispatch(logout());
		setIsMobileMenuOpen(false);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="bg-gray-800 shadow-lg">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					<Link to="/" className="text-white text-2xl font-bold">
						TodoFy
					</Link>

					<div className="md:hidden">
						<button
							onClick={toggleMobileMenu}
							className="text-gray-400 focus:outline-none"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d={
										isMobileMenuOpen
											? "M6 18L18 6M6 6l12 12"
											: "M4 6h16M4 12h16m-7 6h7"
									}
								></path>
							</svg>
						</button>
					</div>

					<div className="hidden md:flex gap-6 items-center text-base">
						<Link
							to={isLoggedIn ? `/profile` : "/login"}
							className="text-gray-400 px-2 hover:text-gray-100 duration-300 font-medium"
						>
							Profile
						</Link>
						<Link
							to="/todos"
							className="text-gray-400 px-2 hover:text-gray-100 duration-300 font-medium"
						>
							Todos
						</Link>

						{isLoggedIn ? (
							<div className="flex items-center space-x-4">
								<span className="text-sm text-gray-300">
									Welcome, {userData.username}!
								</span>
								<button
									onClick={handleLogout}
									className="bg-red-600 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
								>
									<TbLogout2 /> Logout
								</button>
							</div>
						) : (
							<Link
								to="/login"
								className="bg-indigo-600 hover:bg-indigo-700 duration-300 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
							>
								<TbLogin2 /> Login
							</Link>
						)}

						<Link
							to={isLoggedIn ? "/create-todo" : "/login"}
							className="bg-green-600 hover:bg-green-700 duration-300 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
						>
							<IoAddCircleOutline /> Add
						</Link>
					</div>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="md:hidden absolute right-4 top-24 w-[300px] rounded shadow-lg bg-gray-800 h-fit px-2 pt-2 pb-3 space-y-1 sm:px-4 flex flex-col items-center gap-3">
					<Link
						to={isLoggedIn ? `/profile` : "/login"}
						className="text-gray-400 block rounded-md text-base font-medium hover:text-gray-100 duration-300"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Profile
					</Link>
					<Link
						to="/todos"
						className="text-gray-400 block rounded-md text-base font-medium hover:text-gray-100 duration-300"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Todos
					</Link>

					{isLoggedIn ? (
						<>
							<div className="flex flex-col gap-4 items-center space-x-4 px-3 py-2">
								<p className="text-sm text-gray-300">
									Welcome, {userData.username}!
								</p>
								<button
									onClick={handleLogout}
									className="bg-red-600 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
								>
									<TbLogout2 /> Logout
								</button>
							</div>
						</>
					) : (
						<Link
							to="/login"
							className="bg-indigo-600 hover:bg-indigo-700 duration-300 text-white text-center font-bold py-2 px-4 rounded flex items-center gap-1"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<TbLogin2 /> Login
						</Link>
					)}

					<Link
						to={isLoggedIn ? "/create-todo" : "/login"}
						className="bg-green-600 hover:bg-green-700 duration-300 text-white block text-center font-bold py-2 px-4 rounded"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Add To-Do
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
