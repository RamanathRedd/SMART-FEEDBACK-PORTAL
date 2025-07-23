import React, { useEffect, useState } from "react";
import SubmitFeedback from "../SubmitFeedback/SubmitFeedback";
import AppNavbar from "../AppNavbar/AppNavbar";
import FeedbackHistoryAdmin from "../FeedbackHistoryAdmin/FeedbackHistoryAdmin";
import FeedbackHistory from "../FeedbackHistory/FeedbackHistory";

const Dashboard: React.FC = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const tempUser = localStorage.getItem("loggedData");
    setRole(JSON.parse(tempUser ? tempUser : "").isAdmin ? "Admin" : "User");
  }, []);

  return (
    <>
      <AppNavbar />
      {role == "User" && (
        <div className="dashboard-container">
          <div className="feedback-history">
            <FeedbackHistory />
          </div>
          <div className="submit-feedback">
            <SubmitFeedback />
          </div>
        </div>
      )}
      {role == "Admin" && (
        <div className="dashboard-container">
          <div className="feedback-history">
            <FeedbackHistoryAdmin />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
