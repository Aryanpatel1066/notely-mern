import React, { useState } from "react";
import TodoList from "./TodoList";
import GetTodo from "./GetTodo";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTodoAdded = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setIsModalOpen(false); // Close modal after adding todo
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <GetTodo />

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg text-3xl hover:bg-white hover:text-blue-500 transition-all duration-300 w-14 h-14 flex items-center justify-center border-2 border-blue-500 hover:border-blue-500"
>
        +
      </button>

      {/* Modal for Adding Todo */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
            <TodoList onTodoAdded={handleTodoAdded} />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
