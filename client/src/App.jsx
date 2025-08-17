import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem'; // your existing todo item component

function App() {
  // Existing states
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // New filter state
  const [filter, setFilter] = useState('all'); // <- add this

  // Fetch todos from backend
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add todo function
  const addTodo = () => {
    if (!newTodo) return;
    axios.post('http://localhost:5000/todos', { title: newTodo, completed: false })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.log(err));
    setNewTodo('');
  };

  // Filter todos based on filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>My Todo App</h1>

      {/* Input to add new todo */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      {/* Render filtered todos */}
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            setTodos={setTodos} // for updating or deleting inside TodoItem
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
