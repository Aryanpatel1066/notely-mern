import React, { useState } from 'react';
import apiService from '../api/apiservices';  
import { toast, ToastContainer,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoList({ onTodoAdded }) {
  const [title, setTitle] = useState("");  // For storing title of the todo
  const [description, setDescription] = useState("");  // For storing description of the todo
  const [status, setStatus] = useState("ToDo");  // For storing the status of the todo
  const [message, setMessage] = useState("");  // To display success or error message
  const [isLoading, setIsLoading] = useState(false);  // Loading state for the form submission

  // Retrieve the userId from localStorage
  const userId = localStorage.getItem("userId");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is not found in localStorage.");
      setMessage("User ID not found. Please log in.");
      return;
    }

    // Set loading state to true while waiting for the response
    setIsLoading(true);
    try {
      const response = await apiService.post(`/todo/creation/${userId}`, {
        title,
        description,
        status,
      });
      console.log(response.data);  // Log the response data

      // Check if the response message is success
      if (response.data.message === "Todo successfully created!") {
        // setMessage("Todo created successfully!");
        onTodoAdded(response.data.data); //  
        toast.success(`✅"Todo succeessfully created ! "`, {
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

      // Reset the form inputs
      setTitle("");
      setDescription("");
      setStatus("ToDo");
    } catch (error) {
      console.error("Error adding todo:", error);
      // setMessage("Error while adding todo: " + error.message);
      toast.error(`❌${error.message}"error while creating todo"`, {
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
      setIsLoading(false); 
    }
  };

  return (
    <div>
      
      
      {/* Display the success or error message */}
      {message && (
        <div className="mb-4 p-2 text-white bg-green-500 rounded-md">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          ></textarea>
        </div>
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
          >
            <option value="ToDo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? "Adding Todo..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
}

export default TodoList;
