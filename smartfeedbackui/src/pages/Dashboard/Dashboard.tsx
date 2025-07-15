import React from "react";
import AppNavbar from "../AppNavbar/AppNavbar";
import FeedbackHistory from "../FeedbackHistory/FeedbackHistory";
import SubmitFeedback from "../SubmitFeedback/SubmitFeedback";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="app-container">
        <div className="navbar">App Navbar</div>
        <div className="main-content">
          <FeedbackHistory />
          <SubmitFeedback />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
