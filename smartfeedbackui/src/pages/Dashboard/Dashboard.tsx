import React from "react";
import FeedbackHistory from "../FeedbackHistory/FeedbackHistory";
import SubmitFeedback from "../SubmitFeedback/SubmitFeedback";
import AppNavbar from "../AppNavbar/AppNavbar";

const Dashboard: React.FC = () => {
  return (
    <>
      <AppNavbar />
      <div className="dashboard-container">
        <div className="feedback-history">
          <FeedbackHistory />
        </div>
        <div className="submit-feedback">
          <SubmitFeedback />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
