import React, { useState } from "react";
import "./AddEventForm.css";


interface FormData {
  title: string;
  description: string;
  category: string;
  price: string;
  participantCount:string;
  date: string;
  startTime: string;
  endTime: string;
}

interface AddFormProps {
     setForm:()=>void
     formData: FormData;
     setFormData: React.Dispatch<React.SetStateAction<FormData>>;
     maxParticipents:number
}


const AddEventForm: React.FC<AddFormProps> = ({setForm, formData,setFormData ,maxParticipents}) => {
 
  const [err,setErr] = useState<string>('')


  const validateForm = () => {
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);
    const startTime = new Date(`${formData.date}T${formData.startTime}`);
    const endTime = new Date(`${formData.date}T${formData.endTime}`);
    const timeDifference = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);     

    if (!formData.title) {
      setErr("Event title is required!")
      return false
    }

    if (!formData.description) {
      setErr("Event description is required!")
      return false
    }

    if (!formData.category) {
      setErr("Event category is required!")
      return false
    }

    if (!formData.price || isNaN(Number(formData.price))) {
      setErr("Valid ticket price is required!")
      return false
    }

    if (!formData.participantCount || isNaN(Number(formData.participantCount))) {
      setErr("Valid participats count is required!")
      return false
    }

    if (Number(formData.participantCount) > maxParticipents) {
      setErr(`only ${maxParticipents} peoples can joint with this plan`)
      return false
    }

    if (!formData.date || selectedDate < currentDate) {
      setErr("Please select a valid future date!")
      return false
    }

    if (!formData.startTime) {
      setErr("start time is required!")
      return false
    } else if (startTime < currentDate) {
      setErr("Start time cannot be in the past!")
      return false
    }

    if (!formData.endTime) {
      setErr("End time is required!")
      return false
    } else if (endTime <= startTime) {
      setErr("End time must be after the start time!")
      return false
    } else if (timeDifference > 2) {
      setErr("Event duration cannot exceed 2 hours!")
      return false
    }    

    return true;
  };


  const handleContinue = ()=>{
    if(!validateForm()){
      return
    }
    setForm()
    
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const eventTypes = ["SEMINAR","WEBINAR","WORKSHOP","CONFERENCE","OTHER"]

  const resetForm = ()=>{
    setFormData({
      title: "",
      description: "",
      category: "",
      price: "",
      participantCount: "",
      date: "",
      startTime: "",
      endTime: ""
    })
    setErr('')
  }
  return (
    <div className="add-event-form-content">
      {/* <form method="post"> */}
        <div className="event-form-group">
          <label htmlFor="">Event Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange}/>
        </div>
        <div className="event-form-group">
          <label htmlFor="">Event Description</label>
          <textarea value={formData.description} name="description" onChange={handleInputChange}/>
        </div>
        <div className="form-row">
          <div className="event-form-group">
            <label htmlFor="">Event Category</label>
            {/* <input type="select" value={formData.category} name="category" onChange={handleInputChange}/> */}
            <select name="category" id="" onChange={handleInputChange}>
            {eventTypes.map((value,index)=>{
              return (
                <option value={value} key={index}>{value}</option>
              )
            })}
            </select>
          </div>
          <div className="event-form-group">
            <label htmlFor="">Ticket Price</label>
            <input type="text" value={formData.price} name="price" onChange={handleInputChange} />
          </div>
          <div className="event-form-group">
            <label htmlFor="">Available seats</label>
            <input type="text" value={formData.participantCount} name="participantCount" onChange={handleInputChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="event-form-group">
            <label htmlFor="">Date</label>
            <input type="date" className="datepicker-input" name="date" value={formData.date} onChange={handleInputChange}/>
          </div>
          <div className="event-form-group">
            <label htmlFor="">Start Time</label>
            <input type="time" value={formData.startTime} name="startTime" onChange={handleInputChange}/>
          </div>
          <div className="event-form-group">
            <label htmlFor="">End Time</label>
            <input type="time" value={formData.endTime} name="endTime" onChange={handleInputChange}/>
          </div>
        </div>
        <hr/>
        <div className="event-form-btn">
            {err && <p>{err}</p>}
            <input type="reset" onClick={resetForm} />
          <button type="submit" className="continue-button" onClick={handleContinue}>CONTINUE</button>
        </div>
      {/* </form> */}
    </div>
  );
};

export default AddEventForm;
