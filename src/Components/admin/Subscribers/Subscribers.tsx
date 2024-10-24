import React, { useEffect, useState } from 'react'
import './Subscriber.css'
import { getSubscribers } from '../../../api/admin';

interface SubscribersData{
    id: string;
    user:{
      firstName: string;
      lastName: string;
      email: string;
    };
    pricing:{
      category: string;
      title: string;
    }
    startDate: Date;
    expireDate?: Date;
    numberOfEventsUsed: number;
    maxNumberOfEvents?: number;
}

const Subscribers:React.FC = () => {
    const [subriberData, setSubscribersData] = useState<SubscribersData[]>([])

    useEffect(()=>{
        const fetchSubscribers = async()=>{
            try {
                const response = await getSubscribers()
                if(response.status===200){
                    console.log("yaaa got it",response.data);
                    setSubscribersData(response.data)
                }
            } catch (error) {
                console.log(error);     
            }
        }

        fetchSubscribers()
    },[])

    const setDate = (date:Date = new Date())=>{
      return new Date(date).toLocaleDateString()
    }
    
  return (
    <div className="list-table">
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Subscriber</th>
            <th>Email</th>
            <th>plan</th>
            <th>plan Title</th>
            <th>Start Date</th>
            <th>Expire Date</th>
            <th>No of Usage</th>
          </tr>
        </thead>
        <tbody>
            {
              subriberData.map((subscriber,index)=>{
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{`${subscriber.user.firstName} ${subscriber.user.lastName}`}</td>
                    <td>{subscriber.user.email}</td>
                    <td style={{color:'green'}}>{subscriber.pricing.category}</td>
                    <td>{subscriber.pricing.title}</td>
                    <td>{`${setDate(subscriber.startDate)}`}</td>
                    <td>{`${setDate(subscriber.expireDate)}`}</td>
                    <td>{subscriber.numberOfEventsUsed}</td>
                </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  )
}

export default Subscribers