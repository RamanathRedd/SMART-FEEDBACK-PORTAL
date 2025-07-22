import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";

const AppRoutes: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("jwtToken"));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={<Dashboard />}
        // element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
