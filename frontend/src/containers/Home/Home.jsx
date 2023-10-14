import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodosWrapper, SelectThemeBar } from "../../components";
import { fetchUser } from "../../utils/FetchUser";
import { MdLogout } from "react-icons/md";
import "./Home.css";
import { getUser, getTasks } from '../../client';


const Home = () => {
  const [user, setUser] = useState(null);
  const[todos, setTodos]=useState([]);

  const navigate = useNavigate();
  const userInfo = fetchUser();
  const userId = userInfo?._id;


  useEffect(() => {
   getUser(userId).then((data)=>{
    console.log(data[0]);
    setUser(data[0]);
   });   
  }, [userId]);

  useEffect(() => { 
    getTasks(userId).then((data)=>{
     console.log(data);
     setTodos(data)
    });   
   },[]);

   const logout = () => {
    localStorage.clear();   
    navigate("/login");
  };

  return (
    <>     
      <SelectThemeBar />
      <div className='home-welcome'>
        <img src={user?.image} alt='userImage' />
        <p>Hello, {user?.userName}</p>
        <button onClick={logout}>
          <MdLogout color='#a31919' />
        </button>
      </div>  
      <TodosWrapper todos={todos} setTodos={setTodos} userId={user?._id} />
    </>
  );
};

export default Home;
