import React, { useEffect, useState } from 'react'
import './AddEvent.css'
import AddEventStatusBar from '../../../Components/user/UserAddEventSidebar/AddEventStatusBar'
import AddEventForm from '../../../Components/user/AddEventForms/AddEventForm'
import ImageUploader from '../../../Components/user/AddEventForms/ImageUploader'
import { useNavigate } from 'react-router-dom'
import { getPlanOfUser } from '../../../api/user'

const AddEvent:React.FC = () => {
    const [IsForm , setForm] = useState<boolean>(false)
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: "",
      price: "",
      participantCount: '',
      date: "",
      startTime: "",
      endTime: "",
    });

    const [maxParticipents,setmaxParitcipentsCount] = useState<number>(0)

    const navigate = useNavigate()

    useEffect(()=>{
      const checkPlan = async()=>{
        try {
          const response = await getPlanOfUser()
          
          if(response.status !==200){
            navigate('/pricing')
          }else{
            setmaxParitcipentsCount(response.data.pricing.maxParticipents)
          }
        } catch (error) {
          navigate('/pricing')
        }
      }

      checkPlan()
    },[])

  return (
    <div className='addEventPage'>
        <AddEventStatusBar/>
        <div className='add-event-form-content'>
            <h1>Your Event, Your Way!</h1>
            <p>Create, schedule, and promote your event in just three simple steps.
            Let's make your event unforgettable!</p>
            <div className='add-event-form'>
                {IsForm ? 
                <ImageUploader setForm={() => setForm(false)} formData={formData}/> : 
                <AddEventForm setForm={()=>setForm(true)} formData={formData} setFormData={setFormData} maxParticipents={maxParticipents}/>}
                
            </div>
        </div>
    </div>
  )
}

export default AddEvent