import React from "react";

interface ConfirmationModalProps {
  feedbackData: {
    category: string;
    subCategory: string;
    feedback: string;
  };
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  feedbackData,
  onConfirm,
}) => {
  return (
    <div
      className="modal fade"
      id="confirmationModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="confirmationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="confirmationModalLabel">
              Are you sure want to Feedback for {feedbackData.category}-
              {feedbackData.subCategory}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{feedbackData.feedback}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
              data-bs-dismiss="modal"
            >
              I'Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
