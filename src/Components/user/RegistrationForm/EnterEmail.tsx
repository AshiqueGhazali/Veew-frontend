import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';
import { FaGoogle, FaFacebookF } from "react-icons/fa";


const EnterEmail = () => {

    const navigate = useNavigate()

    const handleContinue = () => {
        navigate('/sign-up/verification');
      };

  return (
    <>
      <div className="form-head">
        <h2>Let's Get Started</h2>
      </div>
      <div>
        <div className='form-input'>
            <input type="email" name='email' placeholder="Enter your email" />
        </div>
        <button className="continue-btn" onClick={handleContinue}>Continue</button>
      </div>
      
      <div className="or-divider">
        <p>or continue with</p>
      </div>
      <div className="social-buttons">
        <button className="google-btn social-button"><FaGoogle/> Google</button>
        <button className="facebook-btn social-button"><FaFacebookF/> Facebook</button>
      </div>
    </>
  )
}

export default EnterEmail