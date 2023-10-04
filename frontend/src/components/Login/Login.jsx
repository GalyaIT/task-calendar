import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../../utils/FetchUser";
import "./Login.css";

const Login = () => {
  const user = fetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);

    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, picture, sub } = decoded;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    navigate("/");
  };
  return (
    <div className='todo-login'>
      <div className='todo-bg app__bg'>
        <h1 style={{ marginBottom: "20px", color: "white" }}>
          What's the plan for today?
        </h1>
        <GoogleLogin
          render={(renderProps) => (
            <button
              type='button'
              className=''
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FcGoogle className='mr-4' /> Sign in with google
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy='single_host_origin'
        />
      </div>
      <p>
        Photo by{" "}
        <a href='https://unsplash.com/@sixteenmilesout?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
          Sixteen Miles Out
        </a>{" "}
        on{" "}
        <a href='https://unsplash.com/photos/3ZvHsFiZyME?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
          Unsplash
        </a>
      </p>
    </div>
  );
};

export default Login;
