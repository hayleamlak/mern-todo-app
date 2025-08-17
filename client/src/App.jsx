import { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  useEffect(() => {
    axios.get("/api/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add todo
  const addTodo = async (title) => {
    try {
      const res = await axios.post("/api/todos", { title });
      setTodos([...todos, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle complete
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(`/api/todos/${id}`, { completed: !completed });
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>MERN TODO APP ✅</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
