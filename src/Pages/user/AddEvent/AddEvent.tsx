import React, { useState } from 'react'
import './AddEvent.css'
import AddEventStatusBar from '../../../Components/user/UserAddEventSidebar/AddEventStatusBar'
import AddEventForm from '../../../Components/user/AddEventForms/AddEventForm'
import ImageUploader from '../../../Components/user/AddEventForms/ImageUploader'

const AddEvent:React.FC = () => {
    const [IsForm , setForm] = useState<boolean>(false)
  return (
    <div className='addEventPage'>
        <AddEventStatusBar/>
        <div className='add-event-form-content'>
            <h1>Your Event, Your Way!</h1>
            <p>Create, schedule, and promote your event in just three simple steps.
            Let's make your event unforgettable!</p>
            <div className='add-event-form'>
                {IsForm ? 
                <ImageUploader setForm={()=>setForm(false)}/> : 
                <AddEventForm setForm={()=>setForm(true)}/>}
                
            </div>
        </div>
    </div>
  )
}

export default AddEvent