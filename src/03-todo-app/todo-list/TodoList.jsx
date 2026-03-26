import Button from "../button/Button";
import "./style.css";
import { useRef } from "react";

export default function TodoList({
  todos = [],
  onEdit,
  onDelete,
  OnDone,
  onEditCancel,
  onEditSave,
}) {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          index={index}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          OnDone={OnDone}
          onEditCancel={onEditCancel}
          onEditSave={onEditSave}
        />
      ))}
    </div>
  );
}

function TodoItem({
  index,
  todo,
  onEdit,
  onDelete,
  OnDone,
  onEditCancel,
  onEditSave,
}) {
  const inputRef = useRef("");

  function handleEdit(id) {
    return () => {
      console.log("Edit", id);
      onEdit(id);
    };
  }

  function handleDelete(id) {
    return () => {
      console.log("Delete", id);
      onDelete(id);
    };
  }

  function handleDone(id) {
    return () => {
      console.log("Done", id);
      OnDone(id);
    };
  }

  function handleEditSave(id) {
    return () => {
      const newText = inputRef.current.value;
      console.log("Edit Save", id, newText);
      onEditSave(id, newText);
      inputRef.current.value = "";
    };
  }

  function handleEditCancel(id) {
    return () => {
      console.log("Edit Cancel", id);
      onEditCancel(id);
    };
  }

  if (todo.isEditMode) {
    return (
      <div className="todo-item">
        <input type="text" defaultValue={todo.text} ref={inputRef} />
        <div>
          <Button onClick={handleEditSave(todo.id)} lable="Save" />
          <Button onClick={handleEditCancel(todo.id)} lable="Cancel" />
        </div>
      </div>
    );
  }

  return (
    <div className="todo-item" data-completed-todo={todo.isCompleted}>
      <span>{todo.text}</span>
      <div>
        <Button lable="Edit" onClick={handleEdit(todo.id)} />
        <Button
          className="danger"
          lable="Delete"
          onClick={handleDelete(todo.id)}
        />
        <Button
          className="success"
          lable="Done"
          onClick={handleDone(todo.id)}
        />
      </div>
    </div>
  );
}
