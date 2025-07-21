import React, { useState } from "react";
import "../Register/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterData } from "./Register.types";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  function login() {
    navigate("/login");
  }

  function checkEnteredData() {
    return registerData.name === "" ||
      registerData.gender === "" ||
      registerData.email === "" ||
      registerData.password === "" ||
      registerData.confirm_password === "" ||
      registerData.password !== registerData.confirm_password
      ? true
      : false;
  }

  async function registeredData(e: any) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5112/api/users/register",
        registerData
      );
      toast.success("Registration successful! 🎉");
      login();
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("User already exists or invalid data.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  }

  function setChanges(e: any) {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  }

  return (
    <>
      <div className="register">
        <div className="register-container">
          <h2 className="register-title">Create Account</h2>

          <form onSubmit={registeredData}>
            <label htmlFor="username">
              Username<span> *</span>
            </label>
            <input
              id="username"
              type="text"
              name="name"
              value={registerData.name}
              onChange={setChanges}
              placeholder="Enter your username"
              required
            />

            <label htmlFor="gender">
              Gender<span> *</span>
            </label>
            <select
              name="gender"
              value={registerData.gender}
              onChange={setChanges}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label htmlFor="email">
              Email<span> *</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={registerData.email}
              onChange={setChanges}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">
              Password<span> *</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={registerData.password}
              onChange={setChanges}
              placeholder="Enter your password"
              required
            />

            <label htmlFor="confirm-password">
              Confirm Password<span> *</span>
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirm_password"
              value={registerData.confirm_password}
              onChange={setChanges}
              placeholder="Confirm password"
              required
            />
            <p
              className={
                registerData.password !== registerData.confirm_password
                  ? "error-text"
                  : ""
              }
              hidden={
                (registerData.confirm_password === "" &&
                  registerData.password === "") ||
                (registerData.confirm_password !== "" &&
                  registerData.password === registerData.confirm_password)
              }
            >
              Password Mismatch
            </p>

            <button
              type="submit"
              className={checkEnteredData() ? "not-allow-btn" : "submit-btn"}
              disabled={checkEnteredData()}
            >
              Register
            </button>
          </form>

          <p className="login-link">
            Already have an account? <a onClick={() => login()}>Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
