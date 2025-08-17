function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className={todo.completed ? "completed" : ""}>
          <span onClick={() => toggleTodo(todo._id, todo.completed)}>
            {todo.title}
          </span>
          <button onClick={() => deleteTodo(todo._id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
