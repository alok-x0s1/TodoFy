const Profile = () => {
  const todos = [
    { id: 1, title: 'Todo 1' },
    { id: 2, title: 'Todo 2' },
    { id: 3, title: 'Todo 3' },
  ];

  const handleEditInfo = () => {
    // Handle edit info logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center py-12">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold">User Profile</h2>
            <p className="text-gray-400">Here you can view and manage your profile information.</p>
          </div>
          <button
            onClick={handleEditInfo}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Info
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">Name: John Doe</h3>
          <p className="text-gray-400">Email: john.doe@example.com</p>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">To-Dos</h3>
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li key={todo.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;