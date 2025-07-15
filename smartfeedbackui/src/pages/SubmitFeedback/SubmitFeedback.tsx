import React, { useState } from "react";
import { SubmitFeedbackData } from "./SubmitFeedback.types";

const SubmitFeedback: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<SubmitFeedbackData>({
    heading: "",
    categories: "",
    subCategories: "",
    feedback: "",
  });

  return (
    <div className="submit-feedback">
      <h2>Submit Feedback</h2>
      <form onSubmit={(e) => submittedFeedback(e)}>
        <label htmlFor="heading">Feedback Heading</label>
        <input type="text" id="heading"></input>
        <label htmlFor="categories">Feedback Category</label>
        <select></select>
        <input id="categories"></input>
        <label htmlFor="subCategories">Feedback Subcategory</label>
        <input id="subCategories"></input>
        <label htmlFor="feedback">Feedback</label>
        <input type="text" id="feedback"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

  function submittedFeedback(e: any) {
    console.log(e);
  }
};

export default SubmitFeedback;
