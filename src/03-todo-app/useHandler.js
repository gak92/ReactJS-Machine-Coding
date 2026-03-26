import { useState } from "react";
const TODO_KEY = "my-todos";
const FILTER_TYPE = {
  DONE: 1,
  PENDING: 2,
  UNKNOWN: 3,
};

import { saveInLocalStorage, getTodosFromLocalStorage } from "./utils";

function useHandler() {
  const [todos, setTodos] = useState(getTodosFromLocalStorage());
  const [todoText, setTodoText] = useState("");
  const [activeFilter, setActiveFilter] = useState(FILTER_TYPE.UNKNOWN);

  function preserveTodos(data) {
    setTodos(data);
    const strTodos = JSON.stringify(data);
    saveInLocalStorage(TODO_KEY, strTodos);
  }

  function handleTodoChange(text) {
    setTodoText(text);
  }

  function handleAddTodo() {
    const oldTodos = structuredClone(todos);

    const newTodo = {
      id: window.todoId++,
      text: todoText,
      isEditMode: false,
      isCompleted: false,
    };

    setTodos([newTodo, ...oldTodos]);
    setTodoText("");
    preserveTodos([newTodo, ...oldTodos]);
  }

  function handleEditTodo(id) {
    console.log("Edit", id);
    const newTodos = todos.map((todo) => {
      todo.isEditMode = id === todo.id ? true : false;
      return { ...todo };
    });
    // setTodos(newTodos);
    preserveTodos(newTodos);
  }

  function handleDeleteTodo(id) {
    console.log("Delete", id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    preserveTodos(newTodos);
  }

  function handleDoneTodo(id) {
    console.log("Done", id);
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = true;
      }
      return { ...todo };
    });
    preserveTodos(newTodos);
  }

  function handleEditCancelTodo(id) {
    console.log("Edit Cancel", id);
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditMode = false;
      }
      return { ...todo };
    });
    // setTodos(newTodos);
    preserveTodos(newTodos);
  }

  function handleEditSaveTodo(id, newText) {
    // use id instead index, to improve it
    console.log("Edit Save", index, newText);

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = newText;
        todo.isEditMode = false;
      }
      return { ...todo };
    });

    // const newTodos = structuredClone(todos);
    // newTodos[index].text = newText;
    // newTodos[index].isEditMode = false;
    // setTodos(newTodos);
    preserveTodos(newTodos);
  }

  function handleFilter() {
    if (activeFilter === FILTER_TYPE.UNKNOWN) {
      setActiveFilter(FILTER_TYPE.DONE);
    } else if (activeFilter === FILTER_TYPE.DONE) {
      setActiveFilter(FILTER_TYPE.PENDING);
    } else if (activeFilter === FILTER_TYPE.PENDING) {
      setActiveFilter(FILTER_TYPE.DONE);
    }
  }

  return {
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
  };
}

export default useHandler;
