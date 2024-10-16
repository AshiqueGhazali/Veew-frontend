import React, { useState } from 'react'
import './PricingAddAndEditModal.css'
import { addPlan } from '../../../api/admin'
import { toast } from 'react-toastify'

interface modalProp {
  isOpen:boolean
  onClose:()=>void
}

const PricingAddAndEditModal:React.FC<modalProp> = ({isOpen,onClose}) => {

  const [title , setTiltle] = useState<string>('')
  const [price , setPrice] = useState<number|undefined>(undefined)
  const [numberOfEvents, setNumberOfEvents] = useState<number|undefined>(undefined)
  const [expireAfter , setExpire] = useState<number|undefined>(undefined)
  const [maxParticipents , setParticipantsCount] = useState<number|undefined>(undefined)
  const [idealFor , setIdeal] = useState<string>('')
  const [category, setCategory] = useState<string>('select category');
  const [error, setError] = useState<string>('')
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  if(!isOpen)return null
  
  const options = ['PRICING', 'SUBSCRIPTION'];

  const handleOptionClick = (option: string) => {
    setCategory(option);
    setIsDropdownOpen(false);
  };


  const validatePlan = ()=>{
    if(!title){
      setError('Title is required!');
      return false
    }

    if(category && !options.includes(category.toUpperCase())){
      setError('Invalid category!')
      return false
    }

    if(price && (price < 0 || price > 999999)){
      setError('Invalid price!')
      return false;
    }

    if(!numberOfEvents || numberOfEvents < 0 || numberOfEvents > 99){
      setError("Invalid Number of events")
      return false
    }

    if(category==='SUBSCRIPTION' && (!expireAfter || expireAfter < 0 || expireAfter > 99 )){
      setError('Invalid expiration month count!')
      return false
    }

    if(!maxParticipents ||(maxParticipents <= 0 || maxParticipents > 999)){
      setError('Invalid participent count')
      return false
    }

    if(!idealFor){
      setError('Invalid idealFor')
      return false
    }

    return true
  }

  const handleSubmit = async()=>{
    try {      

      if(!validatePlan()){
        return
      }

      const response = await addPlan({
        title,
        category,
        price,
        numberOfEvents,
        expireAfter,
        maxParticipents,
        idealFor
      })

      if(response.status===200){
        toast.success(response.data.message)
        onClose()
      }
      
    } catch (err:any) {
      setError(err.response.data.message)
      console.log(err);
      
    }
  }

  
  return (
    <div className="modal-overlay">
      <div className="pricing-modal">
        <div className="modal-header">
          <h3>Add Plan</h3>
          <button  className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="pricing-modal-body">
              {error&&<p className='error-text'>{error}</p>}
              <input type="text" value={title} placeholder="Enter your title" onChange={(e)=>setTiltle(e.target.value)}  />
              <div className="custom-dropdown">
                <div className="dropdown-header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{category || 'Select an option'}</div>
                {isDropdownOpen && (
                  <ul className="dropdown-list">
                    {options.map((option) => (
                      <li
                        key={option}
                        className="dropdown-item"
                        onClick={() => handleOptionClick(option)}>
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input type="number" value={price} className="no-spinner" placeholder="Enter Price" min={0} onChange={(e)=>setPrice(Number(e.target.value))} />
              <input type="number" value={numberOfEvents} className="no-spinner"  placeholder="Enter Maximum Number of Events" onChange={(e)=>setNumberOfEvents(Number(e.target.value))} />
              {category==='SUBSCRIPTION' && <input type="number" value={expireAfter} className="no-spinner" 
                placeholder="Expired After(Number of Months)" min={0} 
                onChange={(e)=>setExpire(Number(e.target.value))}
              />}
              <input type="number" value={maxParticipents} className="no-spinner"  placeholder="Enter Maximum Number of Participants" onChange={(e)=>setParticipantsCount(Number(e.target.value))} />
              <input type="text" value={idealFor}  placeholder="Ideal For..." onChange={(e)=>setIdeal(e.target.value)} />
            </div>
            <div className="pricing-modal-footer">
              <button className="submit-btn" onClick={handleSubmit}>Save</button>
            </div>
      </div>
    </div>
  )
}

export default PricingAddAndEditModal