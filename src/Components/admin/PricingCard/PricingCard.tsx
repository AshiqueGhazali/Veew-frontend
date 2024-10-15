import React from 'react'
import './PricingCard.css'

const PricingCard:React.FC = () => {
  return (
    <div className='pricing-plans'>
        <div className='pricing-plan'>
            <p>Plan Name</p>
            <h2>3333</h2>
            <p className='plan-description'>and it s flfdsjal afsdljlafsdj asdf jlsdfj sdafljldfs adflkjldfsa jldfsjl fdsljldfsj lkjdfsljf</p>
            <div className="plan-action-btn">
                <button>Edit</button>
                <button>Unlist</button>
            </div>
        </div>
        <div className='pricing-plan'></div>
        <div className='pricing-plan'></div>
        <div className='pricing-plan'></div>
        <div className='pricing-plan'></div>
        <div className='pricing-plan'></div>
        <div className='pricing-plan'></div>
    </div>
  )
}

export default PricingCard