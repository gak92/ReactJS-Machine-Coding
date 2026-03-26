const TODO_KEY = "my-todos";

function getTodosFromLocalStorage() {
  const strTodos = localStorage.getItem(TODO_KEY);
  if (!strTodos) {
    return [];
  }
  const todos = JSON.parse(strTodos);
  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);
  window.todoId = maxId + 1;
  return todos;
}

function saveInLocalStorage(key, todo) {
  localStorage.setItem(key, todo);
}

export { getTodosFromLocalStorage, saveInLocalStorage };
