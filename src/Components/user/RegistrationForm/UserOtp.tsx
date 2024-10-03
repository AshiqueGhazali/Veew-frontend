import React, { useRef, useState } from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import Api from '../../../services/axios';
import { toast } from 'react-toastify';

const UserOtp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [error,setError] = useState<string | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input 
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] !== '') {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    } else if (e.key >= '0' && e.key <= '9') {
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      e.preventDefault();
    }
  };

  const handleFocus = (index: number) => {
    if (otp[index] === '') {
      inputRefs.current[index]?.select();
    }
  };


  const handleVerification = async() => {
    const userOtp = Number(otp.join(''))
    try {
      const response = await Api.post('/verify-otp', { userOtp });

      if(response.status === 200){
        navigate('/sign-up/register')
      }else{
        setError(response.data.message)
        toast.error(error)
      }

    } catch (err) {
      setError('An error occurred. Please try again later.');
      toast.error(error)
    }
  };

  return (
    <>
      <div className='form-head'>
        <h2>Just one step away!</h2>
        <p>Please enter the OTP sent to example@gmail.com</p>
      </div>
      <div>
        <div className='otp-input'>
          {otp.map((_, index) => (
            <input
              key={index}
              ref={(el) => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => handleFocus(index)}
              autoFocus={index === 0}
              className="otp-digit"
            />
          ))}
        </div>
        <button className="verity-btn" onClick={handleVerification}>Continue</button>
      </div>
    </>
  );
};

export default UserOtp;
