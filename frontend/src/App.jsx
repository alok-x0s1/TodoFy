import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import CreateTodo from "./components/CreateTodo";
import Profile from "./components/Profile";
import Loader from "./components/Loader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/create-todo",
      element: <CreateTodo />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/loading",
      element: <Loader />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;