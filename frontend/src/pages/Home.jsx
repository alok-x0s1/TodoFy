import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import moment from "moment";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getAllTodos = async () => {
      if (!userData) return;

      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${apiUrl}/todos/all`, {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        });

        if (res.data.success) {
          setTodos(res.data.todos);
        }
      } catch (error) {
        setError(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    getAllTodos();
  }, [userData]);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
      <Navbar />
      {error ? (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 p-4 bg-red-600 text-white rounded">
          {error.error || error.message}
        </div>
      ) : null}
      <main className="flex flex-col items-center py-12 px-4">
        {!userData ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Please log in to access your todos.
            </h2>
            <button
              onClick={handleLogin}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Log In
            </button>
          </div>
        ) : (
          <div className="w-full max-w-7xl p-8 space-y-8">
            <h3 className="text-2xl font-bold mb-4">Your To-Dos</h3>
            {loading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {todos.map((todo) => (
                  <Link
                    key={todo._id}
                    to={`/todo/${todo._id}`}
                    className={`p-6 cursor-pointer rounded-lg shadow-lg border-l border-t border-b bg-gray-800 hover:bg-gray-700 duration-300 ${
                      todo.isCompleted
                        ? "border-r-4 border-r-green-500"
                        : "border-r-4 border-r-red-500"
                    }`}
                  >
                    <h4 className="text-xl font-bold mb-2">{todo.title}</h4>
                    <p className="text-gray-300 mb-2">{todo.description}</p>
                    <p className="text-sm text-gray-500">
                      {moment(todo.createdAt).format("MMMM Do, YYYY, h:mm a")}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
