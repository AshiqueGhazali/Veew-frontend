import React from 'react'
import './UserAddEventComponents.css'
import Logo from '../../../assets/veewLogo.png'
import { useNavigate } from 'react-router-dom'
import { featuresData } from '../../../data/featuresData'


const AddEventStatusBar:React.FC= () => {
    const navigate = useNavigate()
  return (
    <div className='event-features'>
        <img src={Logo} alt="" onClick={()=>navigate(-2)}/>
        <div className="hosting-feature-list">
            {featuresData.map((feature, index) => (
            <div key={index} className="hosting-feature-item">
                <div className="feature-icon">
                <feature.icon />
                </div>
                <div className="feature-text">
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
    
  )
}

export default AddEventStatusBar