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


// <div className='event-adding-status'>
    //     <img src={Logo} alt="" onClick={()=>{navigate(-2)}}/>
    //     <div className='progress-status'>
    //         <div className='event-progressbar'>
    //             <div className={`form-step ${step===1 && 'active'} ${step > 1 && 'completed'}`}>
    //                 <div className="prog-icon">1</div>
    //                 <p>Add Event Info</p>
    //             </div>
    //             <div className={`form-step ${step===2 && 'active'} ${step > 2 && 'completed'}`}>
    //                 <div className="prog-icon">2</div>
    //                 <p>Schedule Date & Time</p>
    //             </div>
    //             <div className={`form-step ${step===3 && 'active'} ${step > 3 && 'completed'}`}>
    //                 <div className="prog-icon">3</div>
    //                 <p>Media & Banner</p>
    //             </div>
    //         </div>
    //     </div>
    // </div>