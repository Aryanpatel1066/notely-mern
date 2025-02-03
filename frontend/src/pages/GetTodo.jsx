import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import apiService from "../api/apiservices";

function GetTodo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null); // Track todo being edited
  const [formData, setFormData] = useState({ title: "", description: "", status: "" });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiService.get(`/todo/${userId}`);
        setTodos(response.data.todos || []);
      } catch (error) {
        setError("Error fetching todos.");
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTodos();
    } else {
      setError("User ID not found. Please log in.");
      setLoading(false);
    }

    // Poll every 5 seconds
    const interval = setInterval(() => {
      if (userId) {
        fetchTodos(); // Call the fetchTodos function to refresh the todo list
      }
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "ToDo":
        return "bg-red-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Delete Function
  const handleDelete = async (id) => {
    try {
      await apiService.delete(`/todo/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Open Edit Form
  const openEditForm = (todo) => {
    setEditingTodo(todo);
    setFormData({ title: todo.title, description: todo.description, status: todo.status });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Todo
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.put(`/todo/${editingTodo._id}`, formData);
      setTodos(todos.map((todo) => (todo._id === editingTodo._id ? response.data.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading todos...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (todos.length === 0) return <p className="text-center text-lg font-semibold">No todos created yet.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">List of Todos</h2>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo._id} className="border rounded-lg p-4 shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{todo.title}</h3>
              <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{todo.description}</p>
            <p className="mt-2 font-medium">
              Status:{" "}
              <span className={`text-white px-3 py-1 rounded ${getStatusColor(todo.status)}`}>
                {todo.status}
              </span>
            </p>
            <div className="mt-3 flex space-x-3">
              <button onClick={() => openEditForm(todo)} className="text-blue-500">
                <FaEdit size={20} />
              </button>
              <button onClick={() => handleDelete(todo._id)} className="text-red-500">
                <FaTrash size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Form (Only shows when editingTodo is set) */}
      {editingTodo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                required
                className="p-2 border border-gray-300 rounded-md w-full mb-4"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
                className="p-2 border border-gray-300 rounded-md w-full mb-4"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full mb-4"
              >
                <option value="ToDo">ToDo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setEditingTodo(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetTodo;
