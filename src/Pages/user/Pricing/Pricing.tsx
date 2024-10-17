import React, { useEffect, useState } from 'react'
import './Pricing.css'
import UserNavbar from '../../../Components/user/UserNavbar/UserNavbar'
import Banner from '../../../assets/hero-banner2.jpg'
import SubscriptionCards from '../../../Components/user/SubscriptionCards/SubscriptionCards'
import Footer from '../../../Components/user/Footer/Footer'
import { IPricingPlan } from '../../../interface/pricingInterface'
import { getSubscriptionPlans } from '../../../api/user'

const Pricing:React.FC = () => {
  const [pricingData , setPricingData]= useState<IPricingPlan[] | null>(null)
  const [plan , setPlan] = useState<'PRICING' | 'SUBSCRIPTION'>('PRICING')

  useEffect(()=>{
    const fetchPlans = async()=>{
      try {
        const response = await getSubscriptionPlans()

        if(response.status===200){  
          setPricingData(response.data)         
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    fetchPlans()
  },[])

  const setActiveClass = (str:string)=>{
    return str===plan ? 'active' : ''
  }

  return (
    <>
    <UserNavbar/>
        <div className='pricing-hero'> 
            <img src={Banner} alt="" className='pricing-banner-img' />
            <div className='pricing-hero-caption'>
              <h1>Pricing Plan</h1>
              <p>Find the right plan to fuel your growth</p>
              <div className='hero-btns'>
                <button className={setActiveClass('PRICING')} onClick={()=>setPlan('PRICING')}>Pricing</button>
                <button className={setActiveClass('SUBSCRIPTION')} onClick={()=>setPlan('SUBSCRIPTION')}>Subscription</button>
              </div>
            </div> 
        </div>
        {pricingData && <SubscriptionCards pricingData={pricingData} plan={plan} />}
        <Footer/>
    </>
  )
}

export default Pricing