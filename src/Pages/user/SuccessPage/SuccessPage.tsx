import React, { useEffect, useState } from 'react'
import './SuccessPage.css'
import success_banner from '../../../assets/success-banner.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { toast } from 'react-toastify'
import { subscribePlan } from '../../../api/user'

const SuccessPage:React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [message,setMessage] = useState<string>('')


    useEffect(() => {

      const isPayment = localStorage.getItem('isPayment');
    
      if (!isPayment || JSON.parse(isPayment) !== true) {
        navigate(-1); 
        return;
      }

        const params = queryString.parse(location.search);
        const sessionId = params.session_id as string; 
        const planId = params.plan_id as string;
        const eventId = params.event_id as string

        if(planId){
          const conformSubscription = async()=>{
            const response = await subscribePlan(planId,sessionId)
  
            if(response.status===200){
              setMessage('Thank you for your purchase!, Explore your Subscription')
              setTimeout(()=>{
                localStorage.removeItem('isPayment')
                navigate('/')
              },5000)
            }else{
              setMessage("somthing went wrong, your mony will refund")
            }
          }

          conformSubscription()
          
        }else if(eventId){
          console.log("hellloooo");
          
        }else{
          toast.error("Nothingggggggg")
        }
        
    }, [location,navigate]);

  return (
    <>
      <img src={success_banner} alt="" className="success-banner" />
     <div className='success-page'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="status-svg">
            <path fill="#01d596" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
          </svg>
          <h1>Payment Successful!</h1>
          <p>{message ? message : 'Thank you for your purchase!'}</p>
          <button className='back-btn' onClick={()=>navigate('/')}>Back to Home</button>
      </div>
    </>
   
  )
}

export default SuccessPage