import React, { useEffect } from 'react'
import './SuccessPage.css'
import failur_banner from '../../../assets/failiar-banner.jpg'
import { useNavigate } from 'react-router-dom'

const FailurePage:React.FC = () => {
    const navigate = useNavigate()

    useEffect(()=>{
      const isPayment = localStorage.getItem('isPayment');
    
      if (!isPayment || JSON.parse(isPayment) !== true) {
        navigate(-1); 
        return;
      }
    },[navigate])

    useEffect(()=>{
      setTimeout(()=>{
        localStorage.removeItem('isPayment')
        navigate('/')
      },5000)
    })
    
  return (
    <>
      <img src={failur_banner} alt="" className="success-banner" />
     <div className='success-page'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="status-svg">
            <path fill="#c40303" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>          </svg>
          <h1>Payment Failed!</h1>
          <p>Unfortunately, your payment could not be processed</p>
          <button className='back-btn' onClick={()=>navigate('/')}>Back to Home</button>
      </div>
    </>
   
  )
}

export default FailurePage