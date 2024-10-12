import React, { useState } from 'react';
import './Modal.css'; 
import { resetPassword, setForgotPasswordOtp, verifyForgotPasswordOtp } from '../../../api/user';
import { toast } from 'react-toastify';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
enum EPage{
  EMAIL='EMAIL',
  OTP='OTP',
  PASSWORD='PASSWORD'
}
const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('')
  const [err , setError] = useState<string>('');
  const [page,setPage] = useState<EPage>(EPage.EMAIL);
  const [password, setPassword] = useState<string>('')

  if (!isOpen) return null;

  const validateEmail=(email:string)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const onSubmit = async(email:string)=>{
    if(!validateEmail(email)){
      setError('please enter valid email')
      return
    }
    setError('')

    try {
      const response = await setForgotPasswordOtp(email)

      if(response.status===200){
        setPage(EPage.OTP)
      }
    } catch (err:any) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }

  const handleVerification = async(otp:string)=>{
    const OTP = Number(otp)

    try {
      const response = await verifyForgotPasswordOtp(OTP,email)

      if(response.status===200){
        setPage(EPage.PASSWORD)
      }
    } catch (error) {
      console.log(error); 
    }
  }

  const handleUpdatePassword = async()=>{
    try {
      const response = await resetPassword(email,password)

      if(response.status===200){
        onClose()
        toast.success("password updated successfully!")
      }
    } catch (error) {
      console.log(error);
    }
  }


  const pageContent = ()=>{
    switch(page){
      case EPage.EMAIL :
        return (
          <>
            <div className="modal-body">
              <p>Please enter your email address to reset your password.</p>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
              <p className='err-text'>{err}</p>
            </div>
            <div className="modal-footer">
              <button className="submit-btn dark-btn" onClick={() =>onSubmit(email)}>Continue</button>
            </div>
          </>
        );
      case EPage.OTP:
        return (
          <>
            <div className="modal-body">
              <p>Please enter the OTP sent to {email}</p>
              <input type="text" value={otp} onChange={(e) =>setOtp(e.target.value)}/>
              <p className='err-text'>{err}</p>
            </div>
            <div className="modal-footer">
              <button className="submit-btn dark-btn" onClick={() =>handleVerification(otp)}>Verify</button>
            </div>
          </>
        );
        case EPage.PASSWORD:
        return (
          <>
            <div className="modal-body">
              <p>Set your New Password</p>
              <input type="text" value={password}  onChange={(e) =>setPassword(e.target.value)}/>
              <p className='err-text'>{err}</p>
            </div>
            <div className="modal-footer">
              <button className="submit-btn dark-btn" onClick={handleUpdatePassword}>Save</button>
            </div>
          </>
        )
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Forgot Password?</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        {pageContent()}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;





