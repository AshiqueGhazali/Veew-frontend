import React from 'react'
import './PricingManagement.css'
import PricingCard from '../PricingCard/PricingCard'

const PricingManagement:React.FC = () => {
  return (
    <div>
        <div className='pricing-btn'>
            <div className='oprion-btn'>
                <button className='active'>Pricing</button>
                <button>Subscription</button>
            </div>
            <div className='add-btn'>
                <button>Add plan</button>
            </div>
        </div>
        <PricingCard/>
    </div>
  )
}

export default PricingManagement