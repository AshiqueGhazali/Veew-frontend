import React from 'react'
import './AddEvent.css'
import AddEventStatusBar from '../../../Components/user/UserAddEventSidebar/AddEventStatusBar'
import AddEventForm from '../../../Components/user/AddEventForms/AddEventForm'

const AddEvent:React.FC = () => {
  return (
    <div className='addEventPage'>
        <AddEventStatusBar/>
        <div className='add-event-form-content'>
            <h1>Your Event, Your Way!</h1>
            <p>Create, schedule, and promote your event in just three simple steps.
            Let's make your event unforgettable!</p>
            <div className='add-event-form'>
                <AddEventForm/>
            </div>
        </div>
    </div>
  )
}

export default AddEvent