import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './containers/Home/Home'
import Login from './components/Login/Login'
import './App.css'


function App() {
  return (
    <div className='todo__app'>
      <Routes>
      <Route path='/login' element={<Login />} />    
       <Route path='/*' element={<Home/>}/>
      </Routes>         
    </div>
  );
}

export default App;
