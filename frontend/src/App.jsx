import React, {useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import './App.css'
import Home from './containers/Home/Home'
import Login from './components/Login/Login'
import { fetchUser } from './utils/FetchUser';


function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
   const User = fetchUser();
   if (!User) navigate('/login');
 }, []);

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
