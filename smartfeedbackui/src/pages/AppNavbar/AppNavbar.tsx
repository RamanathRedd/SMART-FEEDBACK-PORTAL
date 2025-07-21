import React from "react";
import "./AppNavbar.css";

const AppNavbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-center">SmartFeedback Portal</div>
      <div className="navbar-right">
        <i className="bi bi-person-circle"></i>
      </div>
    </div>
  );
};

export default AppNavbar;
