import React from 'react';
import './RegistrationForm.css';


const RegistrationForm: React.FC = () => {

  return (
    <>
      <div className='form-head'>
        <h2>Let's get you set up!</h2>
        <p>Create your account and you're ready to go.</p>
      </div>
      <div>
        <div className='form-input'>
          <div><input type="text" name='first-name' placeholder="Enter your First Name" /></div>
          <div><input type="text" name='last-name' placeholder="Enter your Last Name" /></div>
          <div><input type="text" name='password' placeholder="Enter your Password" /></div>
        </div>
        <button className="continue-btn">Sign Up</button>
      </div>
    </>
  );
};

export default RegistrationForm;
