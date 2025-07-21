import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FeedbackHistory.css";

const FeedbackHistory: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  useEffect(() => {
    fetchFeedbacks();
  }, []);
  const token = localStorage.getItem("jwtToken");

  async function fetchFeedbacks() {
    try {
      const response = await axios.get("http://localhost:5112/api/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 404) {
        setFeedbacks([]);
      } else {
        setFeedbacks(response.data);
      }
    } catch (error) {
      console.log("Get feedbacks Error: ", error);
    }
  }

  return (
    <>
      <div className="feedback-container">
        {feedbacks.length === 0 ? (
          <p className="no-feedback">No feedbacks found...</p>
        ) : (
          feedbacks.map((feedback: any, index: number) => (
            <div className="feedback-card fade-in" key={index}>
              <p className="feedback-heading">{feedback.heading}</p>
              <p className="feedback-meta">
                {feedback.category} - {feedback.subCategory}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FeedbackHistory;
