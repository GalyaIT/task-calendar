import React, { useState } from "react";
import "./TodoForm.css";

const TodoForm = ({ onSubmit }) => {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "" || /^\s*$/.test(newItem)) return;
    onSubmit(newItem);
    setNewItem("");
  }
  return (
    <form onSubmit={handleSubmit} className='todo__form'>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        type='text'
        placeholder='New task'
        id='item'
      />
      <button className='btn'>Add</button>
    </form>
  );
};

export default TodoForm;
