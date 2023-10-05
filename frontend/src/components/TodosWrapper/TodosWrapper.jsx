import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";
import "./TodoWrapper.css";

const TodosWrapper = ({ todos, setTodos }) => {
  const [startDate, setStartDate] = useState(new Date());

  let day = ("0" + startDate.getDate()).slice(-2);
  let month = ("0" + (startDate.getMonth() + 1)).slice(-2);
  let year = startDate.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  let hour = ("0" + startDate.getHours()).slice(-2);
  let minutes = ("0" + startDate.getMinutes()).slice(-2);
  let currentTime = `${hour}:${minutes}`;

  const addTodo = (title) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title,
        completed: false,
        edited: false,
        currentDate: currentDate,
        currentTime: currentTime,
      },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              edited: !todo.edited,
            }
          : todo
      )
    );
  };

  const editTask = (title, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, title, edited: !todo.edited, currentTime: currentTime }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='todo__app-wrapper'>
      <h1 style={{ marginBottom: "20px" }}>What's the plan for today?</h1>
      <div className='datePicker-wrapper'>
        <DatePicker
          dateFormat='dd/MM/yyyy'
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeFormat='HH:mm'
          timeIntervals={15}
          showTimeSelect
        />
      </div>
      <TodoForm onSubmit={addTodo} />
      <h3 style={{ marginTop: "20px" }}>Todo List</h3>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        editTask={editTask}
        currentDate={currentDate}
        currentTime={currentTime}
      />
    </div>
  );
};

export default TodosWrapper;