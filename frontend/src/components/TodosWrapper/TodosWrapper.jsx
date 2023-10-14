import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";
import "./TodoWrapper.css";
import { client, getTasks } from '../../client';

const TodosWrapper = ({ todos, setTodos, userId }) => {
  const [startDate, setStartDate] = useState(new Date());

  let day = ("0" + startDate.getDate()).slice(-2);
  let month = ("0" + (startDate.getMonth() + 1)).slice(-2);
  let year = startDate.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  let hour = ("0" + startDate.getHours()).slice(-2);
  let minutes = ("0" + startDate.getMinutes()).slice(-2);
  let currentTime = `${hour}:${minutes}`;

  const navigate = useNavigate();

  const addTodo = (title) => {
    const doc = {
      _type: 'task',
      title,
      userId: userId,
      completed: false,
      currentDate: currentDate,
      createdAt: startDate
    };
    client.create(doc).then(() => {
      getTasks(userId).then((data) => {
        setTodos(data)
      })
      navigate('/');
    });
  };

  const toggleTodo = async (id, completed) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    await client.patch(id)
      .set({
        completed: !completed
      })
      .commit()
      .then(() => {
        console.log('updated');
        navigate("/");
      });
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => todo._id === id ? {
        ...todo, edited: !todo.edited
      } : todo)
    )
  }

  const editTask = async (title, id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, title, edited: !todo.edited } : todo
      )
    );

    const doc = {
      _type: 'task',
      title: title,
    };
    await client.patch(id)
      .set(doc)
      .commit()
      .then(() => {
        console.log('updated');
        navigate("/");
      });
  }
  const deleteTodo = (id) => {
    setTodos(
      todos.filter(todo => todo._id !== id)
    )
    client.delete(id)
      .then(() => {
        console.log("Deleted");
      });
    navigate("/");
  }


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
      />
    </div>
  );
};

export default TodosWrapper;
