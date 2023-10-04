import React, { useState } from "react";

const TodoEditForm = ({ onSubmit, todo }) => {
  const [newItem, setNewItem] = useState(todo.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem === "" || /^\s*$/.test(newItem)) return;
    onSubmit(newItem, todo.id);
  };

  return (
    <form onSubmit={handleSubmit} className='todo__form fade'>
      <input
        defaultValue={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        type='text'
        id='item'
        currentTime={todo.currentTime}
      />
      <button className='btn'>Edit</button>
    </form>
  );
};

export default TodoEditForm;
