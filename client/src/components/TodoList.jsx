function TodoList({ todos, toggleTodo, deleteTodo }) {
 const toggleComplete = (id, currentStatus) => {
  axios.put(`http://localhost:5000/todos/${id}`, { completed: !currentStatus })
    .then(res => setTodos(prev => prev.map(t => t._id === id ? res.data : t)))
    .catch(err => console.log(err));
};

const deleteTodo = (id) => {
  axios.delete(`http://localhost:5000/todos/${id}`)
    .then(() => setTodos(prev => prev.filter(t => t._id !== id)))
    .catch(err => console.log(err));
};


return (
    <ul className="todo-list">
    {todos.map(todo => (
  <li key={todo._id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
    {todo.title}
    <button onClick={() => toggleComplete(todo._id, todo.completed)}>
      {todo.completed ? 'Undo' : 'Complete'}
    </button>
    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
  </li>
))}

    </ul>
  );
}

export default TodoList;
