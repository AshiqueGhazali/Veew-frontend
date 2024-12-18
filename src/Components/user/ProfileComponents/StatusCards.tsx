import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { getProfileStatus } from "../../../api/user";

const StatusCards:React.FC = () => {
    const [status , setStatus] = useState({
        subscription: '' , totalEarnings: 0 , totalEvents: 0 , totalTickets: 0
    })
    const [hover,setHover] = useState<number>(0)

    useEffect(()=>{
        const getStatuses = async()=>{
            try {
                const response = await getProfileStatus()

                if(response.status===200){
                    const {subscription , totalEarnings , totalEvents , totalTickets} = response.data
                    setStatus({subscription,totalEarnings,totalEvents,totalTickets})
                }
            } catch (error) {
                console.log(error);
                
            }
        }

        getStatuses()
    },[])
  return (
    <div className="dashboard-cards">
      <div className="dashboard-card" onMouseEnter={()=>{setHover(1)}} onMouseLeave={()=>{setHover(0)}}>
        <div className={`icon ${hover===1 ? 'bg-[#1ce480]' : 'bg-[#161b1e]' }`}>
          <SiGoogleclassroom />
        </div>
        <div>
          <h4>Events</h4>
          <p>{status.totalEvents}</p>
        </div>
      </div>
      <div className="dashboard-card" onMouseEnter={()=>setHover(2)} onMouseLeave={()=>{setHover(0)}}>
        <div className={`icon ${hover===2 ? 'bg-[#1ce480]' : 'bg-[#161b1e]' }`}>
          <MdOutlineSubscriptions />
        </div>
        <div>
          <h4>Subscription</h4>
          <p>{status.subscription}</p>
        </div>
      </div>
      <div className="dashboard-card" onMouseEnter={()=>setHover(3)} onMouseLeave={()=>{setHover(0)}}>
        <div className={`icon ${hover===3 ? 'bg-[#1ce480]' : 'bg-[#161b1e]' }`}>
          <IoPricetagsSharp />
        </div>
        <div>
          <h4>Tickets</h4>
          <p>{status.totalTickets}</p>
        </div>
      </div>
      <div className="dashboard-card" onMouseEnter={()=>setHover(4)} onMouseLeave={()=>{setHover(0)}}>
        <div className={`icon ${hover===4 ? 'bg-[#1ce480]' : 'bg-[#161b1e]' }`}>
          <FaRupeeSign />
        </div>
        <div>
          <h4>Earnings</h4>
          <p>{status.totalEarnings}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
