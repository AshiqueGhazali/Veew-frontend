import React from "react";
import "./SubscriptionCards.css";
// import { CgEditBlackPoint } from "react-icons/cg";
import { IPricingPlan } from "../../../interface/pricingInterface";
import { createPayment} from "../../../api/user";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

interface cardProps {
  pricingData: IPricingPlan[];
  plan: "PRICING" | "SUBSCRIPTION";
}


const SubscriptionCards: React.FC<cardProps> = ({ pricingData, plan }) => {
  const descriptionStr = (count: number) => {
    const event = plan === "PRICING" ? "online event" : "online event per month";
    return count === 1 ? `${count} ${event}` : `${count} ${event}s`;
    
  };

const makePayment = async(planId:string)=>{
  try {
    const stripe = await loadStripe("pk_test_51QCEy6AppvYNPg5GIJ8IZvuM2iTJyMPNijm8fjT6f7YOdBZnJBGZ8QgNnrX9X1aXhHGCcW0zF7yJHdtugFP9Y8IN00BbNw4tmB");

    const response = await createPayment(planId)
    if (response.data && response.data.sessionId) {
      localStorage.setItem('isPayment','true')
      const result = await stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
      if (result?.error) {
        console.error("Stripe checkout error:", result?.error.message);
      }
    }  
  } catch (error:any) {
    toast.error(error.response.data.message)
    console.log(error);
    
  }
}

  return (
    <div className="plan-div">
      <div className="user-pricing-plans">
        {pricingData
          .filter((data) => {
            return data.category === plan;
          })
          .map((data, index) => {
            return (
              <div className="subscribe-card" key={index}>
                <p>{data.title}</p>
                <h2>₹ {data.price}</h2>
                <div className="plan-buy-btn">
                  <button onClick={()=>makePayment(data.id)}>BUY NOW</button>
                </div>
                <div>
                  <div className="plan-descriptions">
                    <p className="plan-feature">
                      {" "}
                      {`Host ${descriptionStr(data.numberOfEvents)}`}{" "}
                    </p>
                    <p className="desctiption">{`Conduct a ${descriptionStr(
                      data.numberOfEvents
                    )}  tailored to your needs  with a straightforward and easy setup`}</p>
                  </div>
                  <div className="plan-descriptions">
                    <p className="plan-feature">
                      {" "}
                      Maximum {data.maxParticipents} participants per event
                    </p>
                    <p className="desctiption">
                      Supports up to {data.maxParticipents} participants per
                      event for seamless management.
                    </p>
                  </div>
                  <div className="plan-descriptions">
                    <p className="plan-feature">{data.idealFor}</p>
                    <p className="desctiption">
                      Flexible subscription tailored for {data.idealFor}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SubscriptionCards;
