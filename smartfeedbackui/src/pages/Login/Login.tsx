import React, { useState } from "react";
import "./Login.css";
import imgPath from "../../common/images/login-regitser.jpg";
import { useNavigate } from "react-router-dom";
import { error } from "console";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loggedData, setLoggedData] = useState({
    userName: "",
    password: "",
  });
  return (
    <>
      <div className="login">
        <div className="login-image">
          <img src={imgPath} alt="login-register image"></img>
        </div>
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <form onSubmit={(e) => loggedInData(e)}>
            <label htmlFor="username">
              Username<span> *</span>
            </label>
            <input
              id="username"
              type="text"
              name="userName"
              value={loggedData.userName}
              onChange={setChanges}
              placeholder="Enter username"
              required
            />

            <label htmlFor="password">
              Password<span> *</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={loggedData.password}
              onChange={setChanges}
              placeholder="Enter password"
              required
            />

            <button
              type="submit"
              className={checkEnteredData() ? "not-allow-btn" : "submit-btn"}
              disabled={checkEnteredData()}
            >
              Login
            </button>
          </form>

          <p className="register-link">
            Don't have an account?{" "}
            <a onClick={() => register()}>Register Here</a>
          </p>
        </div>
      </div>
    </>
  );

  function register() {
    navigate("/register");
  }

  function setChanges(e: any) {
    const { name, value } = e.target;
    setLoggedData({ ...loggedData, [name]: value });
  }

  function checkEnteredData() {
    return loggedData.password === "" || loggedData.userName === ""
      ? true
      : false;
  }

  async function loggedInData(e: any) {
    e.preventDefault();
    console.log("loggedData", loggedData);
    try {
      const response = await axios.post(
        "http://localhost:5112/api/users/login",
        {
          Email: loggedData.userName,
          PassWord: loggedData.password,
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log("Login Error:", error);
    }
  }
};

export default Login;
