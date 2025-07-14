import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider: React.FC<any> = ({ children }) => {
  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          aria-label="Notification container"
        />
      </div>
    </>
  );
};

export default ToastProvider;
