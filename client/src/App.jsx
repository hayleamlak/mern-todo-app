import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // ✅ Load todos from backend
  useEffect(() => {
    axios.get("http://localhost:5000/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Add todo
  const addTodo = () => {
    if (!text.trim()) return;
    axios.post("http://localhost:5000/todos", { text })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.error(err));
    setText("");
  };

  // ✅ Toggle todo
  const toggleTodo = (id, completed) => {
    axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed })
      .then(res => {
        setTodos(todos.map(t => (t._id === id ? res.data : t)));
      })
      .catch(err => console.error(err));
  };

  // ✅ Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter(t => t._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>✅ MERN Todo</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTodo(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
