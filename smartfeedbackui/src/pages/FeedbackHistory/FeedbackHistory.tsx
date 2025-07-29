import axios from "axios";
import React, { useEffect, useState } from "react";
import SubmitFeedback from "../SubmitFeedback/SubmitFeedback"; // adjust the path if needed
import "./FeedbackHistory.css";

const FeedbackHistory: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const token = localStorage.getItem("jwtToken");

  async function fetchFeedbacks() {
    try {
      const response = await axios.get(
        "http://localhost:5112/api/feedback/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 404) {
        setFeedbacks([]);
      } else {
        setFeedbacks(response.data);
      }
    } catch (error) {
      console.error("Get feedbacks Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="feedback-container">
      {!loading && (
        <div className="table-header">
          <button
            className="add-feedback-button"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <span className="plus-icon">+</span> Add Feedback
          </button>
        </div>
      )}

      {loading ? (
        <table className="feedback-table shimmer-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Sub-category</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>
                  <div className="shimmer shimmer-cell" />
                </td>
                <td>
                  <div className="shimmer shimmer-cell" />
                </td>
                <td>
                  <div className="shimmer shimmer-cell" />
                </td>
                <td>
                  <div className="shimmer shimmer-cell" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : feedbacks.length === 0 ? (
        <p className="no-feedback">No feedbacks found...</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Sub-category</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{feedback.category}</td>
                <td>{feedback.subCategory}</td>
                <td>
                  {feedback.feedbackText.length > 20
                    ? `${feedback.feedbackText.slice(0, 20)}...`
                    : feedback.feedbackText}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Bootstrap Offcanvas with SubmitFeedback inside */}
      <div
        className="offcanvas offcanvas-end feedback-offcanvas"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Submit Feedback
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <SubmitFeedback />
        </div>
      </div>
    </div>
  );
};

export default FeedbackHistory;
