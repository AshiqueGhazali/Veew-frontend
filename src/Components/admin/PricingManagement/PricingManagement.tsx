import React, { useState } from 'react'
import './PricingManagement.css'
import PricingCard from '../PricingCard/PricingCard'
import { useNavigate } from 'react-router-dom'
import PricingAddAndEditModal from '../PricingAddAndEditModal/PricingAddAndEditModal'

const PricingManagement:React.FC = () => {
    const [isModalOpen , setModalOpen] = useState<boolean>(false)

  return (
    <>
    <div>
        <div className='pricing-btn'>
            <div className='oprion-btn'>
                <button className='active'>Pricing</button>
                <button>Subscription</button>
            </div>
            <div className='add-btn'>
                <button onClick={()=>setModalOpen(true)}>Add plan</button>
            </div>
        </div>
        <PricingCard />
    </div>
    {isModalOpen && <PricingAddAndEditModal isOpen={isModalOpen} onClose={()=>setModalOpen(false)}/>}
    </>
    
  )
}

export default PricingManagement