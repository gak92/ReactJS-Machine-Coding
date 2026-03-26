import "./style.css";
import { useState } from "react";
import Button from "./button/Button";
import InputText from "./input-text/InputText";
import TodoList from "./todo-list/TodoList";
import useHandler from "./useHandler";

window.todoId = 1000;
const FILTER_TYPE = {
  DONE: 1,
  PENDING: 2,
  UNKNOWN: 3,
};

export default function TodoApp() {
  const {
    handleTodoChange,
    handleAddTodo,
    handleEditTodo,
    handleDeleteTodo,
    handleDoneTodo,
    handleEditCancelTodo,
    handleEditSaveTodo,
    handleFilter,
    todos,
    activeFilter,
    todoText,
  } = useHandler();

  let todosToShow = [];
  // Todo: Simplify this
  let doneTodos = [];
  let pendingTodos = [];

  todos.forEach((todo) => {
    if (todo.isCompleted) {
      doneTodos.push(todo);
    } else {
      pendingTodos.push(todo);
    }
  });

  if (activeFilter === FILTER_TYPE.UNKNOWN) {
    todosToShow = [...pendingTodos, ...doneTodos];
  } else if (activeFilter === FILTER_TYPE.DONE) {
    todosToShow = [...doneTodos];
  } else if (activeFilter === FILTER_TYPE.PENDING) {
    todosToShow = [...pendingTodos];
  }

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <InputText value={todoText} onChange={handleTodoChange} />
        <Button lable="Add Todo" onClick={handleAddTodo} />
        <Button lable="Show Me Done Todos" onClick={handleFilter} />
      </div>
      {todos.length > 0 && (
        <TodoList
          todos={todosToShow}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          OnDone={handleDoneTodo}
          onEditCancel={handleEditCancelTodo}
          onEditSave={handleEditSaveTodo}
        />
      )}
    </div>
  );
}

/*
Home Work:
1- implement multiple filter
2- click on todo can edit it, click outside save it
3- more option to filter: show all, show completed, show pending
*/
