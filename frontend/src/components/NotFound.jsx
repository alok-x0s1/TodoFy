const NotFound = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
			<div className="text-center">
				<h1 className="text-5xl font-bold mb-4">404</h1>
				<p className="text-2xl mb-8">User not found</p>
				<a href="/" className="text-indigo-600 hover:text-indigo-400">
					Go back to home
				</a>
			</div>
		</div>
	);
};

export default NotFound;