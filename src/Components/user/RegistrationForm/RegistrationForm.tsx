import React from 'react';
import './RegistrationForm.css';
import { FaGoogle, FaFacebookF } from "react-icons/fa";


const RegistrationForm: React.FC = () => {
  return (
    <div className="registration-form">
      <h2>Let's Get Started</h2>
      <div>
        <div>
            <input type="email" placeholder="Enter your email" />
        </div>
        <button className="continue-btn">Continue</button>
      </div>
      
      <div className="or-divider">
        <p>or continue with</p>
      </div>
      <div className="social-buttons">
        <button className="google-btn social-button"><FaGoogle/> Google</button>
        <button className="facebook-btn social-button"><FaFacebookF/> Facebook</button>
      </div>
    </div>
  );
};

export default RegistrationForm;
