import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../api/apiservices";

function GetTodo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", status: "" });

  const userId = localStorage.getItem("userId") || ""; // Ensure userId is not undefined

  useEffect(() => {
    const fetchTodos = async () => {
      const storedUserId = localStorage.getItem("userId"); // Ensure fresh userId retrieval

      if (!storedUserId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiService.get(`/todo/${storedUserId}`);
        setTodos(response.data.todos || []);
      } catch (error) {
        setError("Error fetching todos.");
        toast.error(`"error featching todo"}`, {
          position: "top-right",
          autoClose:2000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:false,
          draggable:true,
          theme:"light",
          transition:Bounce,
        });
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

    const interval = setInterval(fetchTodos, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`/todo/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.error(`✅"todo delete successfully"}`, {
        position: "top-right",
        autoClose:2000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:false,
        draggable:true,
        theme:"light",
        transition:Bounce,
      });
    } catch (error) {
      toast.error(`❌"error deleting todo!"`, {
        position: "top-right",
        autoClose:2000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:false,
        draggable:true,
        theme:"light",
        transition:Bounce,
      });
    }
  };

  const openEditForm = (todo) => {
    setEditingTodo(todo);
    setFormData({ title: todo.title, description: todo.description, status: todo.status });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.put(`/todo/${editingTodo._id}`, formData);
      setTodos(todos.map((todo) => (todo._id === editingTodo._id ? response.data.data : todo)));
      setEditingTodo(null);
       toast.success(`✅"Todo updated successfully!"`, {
        position: "top-right",
        autoClose:2000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:false,
        draggable:true,
        theme:"light",
        transition:Bounce,
      });
    } catch (error) {
       toast.error(`❌"Error updating todo!"`, {
        position: "top-right",
        autoClose:2000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:false,
        draggable:true,
        theme:"light",
        transition:Bounce,
      });
    }
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading todos...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (todos.length === 0) return <p className="text-center text-lg font-semibold">No todos created yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">List of Todos</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover={false} draggable theme="light" />
    </div>
  );
}

export default GetTodo;
