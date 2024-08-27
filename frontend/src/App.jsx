import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import {
	CreateTodo,
	EditProfile,
	EditTodo,
	Home,
	Login,
	Profile,
	Signup,
	SingleTodo,
} from "./pages";
import NotFound from "./components/NotFound";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/signup",
			element: <Signup />,
		},
		{
			path: "/profile",
			element: <Profile />,
		},
		{
			path: "/create-todo",
			element: <CreateTodo />,
		},
		{
			path: "/todos",
			element: <Home />,
		},
		{
			path: "/todo/:id",
			element: <SingleTodo />,
		},
		{
			path: "/todos/edit/:id",
			element: <EditTodo />,
		},
		{
			path: "/profile/edit",
			element: <EditProfile />,
		},
		{
			path: "/loading",
			element: <Loader />,
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
