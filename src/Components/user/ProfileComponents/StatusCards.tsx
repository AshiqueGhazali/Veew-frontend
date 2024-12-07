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
      <div className="dashboard-card">
        <div className="icon" style={{ background: "#0e1823" }}>
          <SiGoogleclassroom />
        </div>
        <div>
          <h4>Events</h4>
          <p>{status.totalEvents}</p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="icon" style={{ background: "#0e1823" }}>
          <MdOutlineSubscriptions />
        </div>
        <div>
          <h4>Subscription</h4>
          <p>{status.subscription}</p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="icon" style={{ background: "#0e1823" }}>
          <IoPricetagsSharp />
        </div>
        <div>
          <h4>Tickets</h4>
          <p>{status.totalTickets}</p>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="icon" style={{ background: "#0e1823" }}>
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
