import React, { useState } from 'react';
import TodoList from './TodoList';
import GetTodo from './GetTodo';

function Dashboard() {
  const [todos, setTodos] = useState([]);

  const handleTodoAdded = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Make sure to pass the handleTodoAdded function to TodoList */}
      <TodoList onTodoAdded={handleTodoAdded} />
      <GetTodo />
    </div>
  );
}

export default Dashboard;
