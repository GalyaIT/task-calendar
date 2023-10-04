import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodosWrapper, SelectThemeBar } from "../../components";
import { fetchUser } from "../../utils/FetchUser";
import { MdLogout } from "react-icons/md";
import "./Home.css";

const Home = () => {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const navigate = useNavigate();
  const user = fetchUser();
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const logout = () => {
    // localStorage.clear();
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <SelectThemeBar />
      <div className='home-welcome'>
        {user ? (
          <>
            <img src={user.picture} alt='' />
            <p>Hello, {user.name}</p>
          </>
        ) : null}
        <button onClick={logout}>
          <MdLogout color='#a31919' />
        </button>
      </div>
      <TodosWrapper todos={todos} setTodos={setTodos} />
    </>
  );
};

export default Home;
