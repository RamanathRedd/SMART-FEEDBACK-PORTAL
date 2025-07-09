import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider: React.FC = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ToastProvider;
