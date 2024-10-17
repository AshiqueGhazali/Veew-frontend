import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="progress-step">
      <div className="progress-bar">
        <div
          className={`step ${step >= 1 ? "active" : ""} ${
            step > 1 ? "complete" : ""
          }`}
        >
          <div className="step-icon">1</div>
          <p>Enter Email</p>
        </div>
        <div
          className={`step ${step >= 2 ? "active" : ""} ${
            step > 2 ? "complete" : ""
          }`}
        >
          <div className="step-icon">2</div>
          <p>OTP Verification</p>
        </div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>
          <div className="step-icon">3</div>
          <p>Register</p>
        </div>
        <div className="progress-line">
          <div
            className="progress"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
