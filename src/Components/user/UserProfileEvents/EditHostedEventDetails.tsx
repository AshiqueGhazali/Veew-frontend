import React, { useState } from "react";
import IEvents from "../../../interface/EventsInterface";
import { editEventDetails } from "../../../api/user";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  eventData:IEvents
}

const EditHostedEventDetails: React.FC<ModalProps> = ({isOpen,setIsOpen,eventData}) => {
  if (!isOpen) {
    return null;
  }

  const [formData, setFormData] = useState({
    eventTitle: eventData.eventTitle,
    description: eventData.description,
    ticketPrice: eventData.ticketPrice,
    // participantCount: eventData.participantCount
  });
  const [err , setErr] = useState<string>('')


  const validateForm = () => {     

    if (!formData.eventTitle) {
      setErr("Event title is required!")
      return false
    }

    if (!formData.description) {
      setErr("Event description is required!")
      return false
    }

    if (formData.ticketPrice < 0) {
      setErr("Valid ticket price is required!")
      return false
    }

    // if (!formData.participantCount || isNaN(Number(formData.participantCount))) {
    //   setErr("Valid participats count is required!")
    //   return false
    // }

    return true;
  };



  const inputClass =
    "bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 ";
  
  const HandleEditDetails = async()=>{
    try {

        if(!validateForm()){
            return
        }
        const response = await editEventDetails({...formData,eventId:eventData.id})

        if(response.status === 200){
            toast.success(response.data.message)
            setIsOpen()
        }
    } catch (error) {
        console.log(error);
        
    }
  }
  
    return (
    <div
      id="authentication-modal"
      aria-hidden={!isOpen}
      className="fixed top-0 border-b border-b-[1px] border-b-black right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white  rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold">Edit Event Detail</h3>
            <button
              type="button"
              onClick={setIsOpen}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">
            <div className="space-y-4" >
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium"
                >
                  Event Ttitle
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.eventTitle}
                  className={inputClass}
                  onChange={(e)=>setFormData({...formData,eventTitle:e.target.value})}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="discription"
                  className="block mb-2 text-sm font-medium"
                >
                  Event Description
                </label>
                <input
                  type="text"
                  name="discription"
                  id="discription"
                  value={formData.description}
                  placeholder="discription.."
                  onChange={(e)=>setFormData({...formData,description:e.target.value})}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium"
                >
                  Ticket Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.ticketPrice || 0}
                  placeholder="price"
                  min={0}
                  onChange={(e)=>setFormData({...formData,ticketPrice:Number(e.target.value)})}
                  className={inputClass}
                  required
                />
              </div>
              {err && <p>{err}</p>}
              <button
                type="submit"
                onClick={HandleEditDetails}
                className="w-full text-white bg-[#937e54] hover:bg-[#bea980]  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#937e54] dark:hover:[#bea980]"
              >
                SAVE EDITS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHostedEventDetails;



{/* <div>
<label
    htmlFor="price"
    className="block mb-2 text-sm font-medium"
>
    Ticket Price
</label>
<select
    id="countries"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
>
    <option selected>Choose a country</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option>
</select>
</div> */}

              {/* <div>
                <label
                  htmlFor="participantCount"
                  className="block mb-2 text-sm font-medium"
                >
                  Max Participent Count
                </label>
                <input
                  type="number"
                  name="participantCount"
                  id="participantCount"
                  value={formData.participantCount}
                  placeholder="maximum participent count"
                  onChange={(e)=>setFormData({...formData,participantCount:Number(e.target.value)})}
                  className={inputClass}
                  required
                />
              </div> */}