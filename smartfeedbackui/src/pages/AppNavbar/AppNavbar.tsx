import React, { useEffect, useRef, useState } from "react";
import "./AppNavbar.css";
import { useNavigate } from "react-router-dom";

const AppNavbar: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});

  const handleIconClick = () => {
    setShowPopover((prev) => !prev);
  };
  useEffect(() => {
    const tempUser = localStorage.getItem("loggedData");
    if (tempUser) {
      setUser(JSON.parse(tempUser));
    }
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function logout() {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="navbar-center">SmartFeedback Portal</div>
      <div className="navbar-right">
        <i className="bi bi-person-circle" onClick={handleIconClick}></i>
        {showPopover && (
          <div className="popover" ref={popoverRef}>
            <p>
              <strong>Username:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppNavbar;
