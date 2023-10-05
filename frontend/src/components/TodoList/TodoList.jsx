import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import TodoEditForm from "../TodoEditForm/TodoEditForm";
import FilterButton from "../FilterButton/FilterButton";
import "./TodoList.css";

const TodoList = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
  editTask,
  currentDate,
}) => {
  const [filter, setFilter] = useState("All");

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  let currentTodos = todos
    ?.filter((t) => t.currentDate === currentDate)
    .sort(function (a, b) {
      if (a.currentTime < b.currentTime) return -1;
      if (a.currentTime > b.currentTime) return 1;
      return 0;
    });

  const taskList = currentTodos?.filter(FILTER_MAP[filter]).map((todo) => {
    if (todo.edited) {
      return <TodoEditForm key={todo.id} onSubmit={editTask} todo={todo} />;
    } else {
      return (
        <TodoItem
          {...todo}
          id={todo.id}
          key={todo.id}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          currentDate={currentDate}
        />
      );
    }
  });

  return (
    <>
      <div className='select-buttons'>{filterList}</div>
      <ul className='list'>
        {taskList?.length === 0 && "No Todos"}
        {taskList}
      </ul>
    </>
  );
};

export default TodoList;