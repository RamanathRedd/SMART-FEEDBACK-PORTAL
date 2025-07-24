import React, { useEffect, useState } from "react";
import SubmitFeedback from "../SubmitFeedback/SubmitFeedback";
import AppNavbar from "../AppNavbar/AppNavbar";
import FeedbackHistoryAdmin from "../FeedbackHistoryAdmin/FeedbackHistoryAdmin";
import FeedbackHistory from "../FeedbackHistory/FeedbackHistory";
import { Route, Routes } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const tempUser = localStorage.getItem("loggedData");
    setRole(JSON.parse(tempUser ? tempUser : "").isAdmin ? "Admin" : "User");
  }, []);

  return (
    <>
      <AppNavbar />
      {role === "User" && (
        <Routes>
          <Route path="" element={<SubmitFeedback />} />
          <Route path="feedback-history" element={<FeedbackHistory />} />
        </Routes>
      )}
      {role == "Admin" && (
        <div className="feedback-history">
          <FeedbackHistoryAdmin />
        </div>
      )}
    </>
  );
};

export default Dashboard;
