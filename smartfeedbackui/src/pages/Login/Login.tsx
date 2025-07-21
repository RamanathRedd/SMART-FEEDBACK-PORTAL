import React, { useState } from "react";
import "./Login.css";
import imgPath from "../../common/images/login-regitser.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginData } from "./Login.types";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loggedData, setLoggedData] = useState<LoginData>({
    email: "",
    password: "",
  });

  function register() {
    navigate("/register");
  }

  function setChanges(e: any) {
    const { name, value } = e.target;
    setLoggedData({ ...loggedData, [name]: value });
  }

  function checkEnteredData() {
    return loggedData.password === "" || loggedData.email === "" ? true : false;
  }

  async function loggedInData(e: any) {
    e.preventDefault();
    console.log("loggedData", loggedData);
    try {
      const response = await axios.post(
        "http://localhost:5112/api/users/login",
        {
          Email: loggedData.email,
          PassWord: loggedData.password,
        }
      );
      toast.success("Login successful! 🎉");
      navigate("/home");
      console.log(response);
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("User not found. Please register first.");
      } else if (error.response?.status === 401) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.error("Something went wrong. Please try later.");
      }
    }
  }
  return (
    <>
      <div className="login">
        <div className="login-image">
          <img src={imgPath} alt="login-register image"></img>
        </div>
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <form onSubmit={(e) => loggedInData(e)}>
            <label htmlFor="email">
              Email<span> *</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={loggedData.email}
              onChange={setChanges}
              placeholder="Enter email"
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
              id="submit"
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
};

export default Login;
