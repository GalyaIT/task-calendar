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
  const currentDate=startDate.toISOString().split('T')[0]; 
  const[isAdded, setIsAdded]=useState(false);


  const navigate = useNavigate();

//create task

  const addTodo = (title) => { 
    const currentTime=new Date().toTimeString().split(' ')[0];  
  
    const doc = {
      _type: 'task',
      title,
      userId: userId,
      completed: false,
      currentDate: currentDate,
      currentTime: currentTime,
    };
      
     client.create(doc).then(() => {
      getTasks(userId).then((data) => {
        setTodos(data)
      })   
    });
    setIsAdded(true);
    navigate('/')
  };

//toggle task
  const toggleTodo =  (id, completed) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    client.patch(id)
      .set({
        completed: !completed
      })
      .commit()
      .then(() => {
        console.log('updated');
        navigate("/");
      });
  }

//edit task

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => todo._id === id ? {
        ...todo, edited: !todo.edited
      } : todo)
    )
  }

  const editTask =  (title, id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, title, edited: !todo.edited } : todo
      )
    );

    const doc = {
      _type: 'task',
      title: title,
    };
     client.patch(id)
      .set(doc)
      .commit()
      .then(() => {
        console.log('updated');
        navigate("/");
      });
  }

  //delete task
  const deleteTodo = (id) => {  
    client.delete(id)
      .then(() => {
        console.log("Deleted");
      });
      setTodos(
        todos.filter(todo => todo._id !== id)
      )
    navigate("/");
  }

  function addDays() {
    const arr =todos.map(task=>new Date(task.currentDate));    
    return arr
  }
  
  const highlightBusy = [
    {
      "react-datepicker__day--highlighted-custom-1": 
        addDays()  
    },
  ]  

  return (
    <div className='todo__app-wrapper'>
      <h1 style={{ marginBottom: "20px" }}>What's the plan for the day?<span>😀</span></h1>
      <div className='datePicker-wrapper'>
        <DatePicker
          showIcon  
          dateFormat='dd/MM/yyyy'
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeFormat='HH:mm'
          timeIntervals={15}
          // showTimeSelect
          highlightDates={highlightBusy}
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
        isAdded={isAdded}
        setIsAdded={setIsAdded}
      />
    </div>
  );
};

export default TodosWrapper;
