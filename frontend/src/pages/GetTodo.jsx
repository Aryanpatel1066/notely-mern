import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch,FaClipboard } from "react-icons/fa";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../api/apiservices";

function GetTodo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", status: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("date"); // Default sorting by date

  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    const fetchTodos = async () => {
      const storedUserId = localStorage.getItem("userId");

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
        toast.error("Error fetching todo", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
          transition: Bounce,
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
  }, [userId]);

  // Filter todos based on search query
  const filteredTodos = todos.filter((todo) => {
    return (
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort todos based on selected criteria
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortCriteria === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "status") {
      return a.status.localeCompare(b.status);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt); // Default: Sort by date
    }
  });

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
      toast.error("✅ Todo deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("❌ Error deleting todo!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
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
      toast.success("✅ Todo updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("❌ Error updating todo!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading todos...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  const handleCopy = (title, description) => {
    const textToCopy = `Title: ${title}\nDescription: ${description}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("✅ Copied to clipboard!", { position: "top-right", autoClose: 2000, transition: Bounce });
    }).catch(() => {
      toast.error("❌ Failed to copy!", { position: "top-right", autoClose: 2000, transition: Bounce });
    });
  };
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        {/* Search Input Box */}
        <div className="relative flex items-center space-x-3 w-1/3">
          <FaSearch size={22} className="absolute left-6 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search todos..."
            className="p-2 pl-10 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex items-center space-x-2 w-1/3">
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="p-2 pl-10 border border-gray-300 rounded-md w-full appearance-none"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="status">Sort by Status</option>
          </select>
          <div className="absolute right-3 top-2.5">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="none"
                stroke="gray"
                strokeWidth="1.5"
                d="M3 5L7.5 9L12 5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Display Todos or No Todos Found */}
      {filteredTodos.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-500">Todo not found</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedTodos.map((todo) => (
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
                <button onClick={() => handleCopy(todo.title, todo.description)} className="text-green-500">
                  <FaClipboard size={20} />
                  </button>
              </div>
            </li>
          ))}
        </ul>
      )}

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
                <button
                  type="button"
                  onClick={() => setEditingTodo(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
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
