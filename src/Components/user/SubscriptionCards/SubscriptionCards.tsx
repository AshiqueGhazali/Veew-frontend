import React from "react";
import "./SubscriptionCards.css";
// import { CgEditBlackPoint } from "react-icons/cg";
import { IPricingPlan } from "../../../interface/pricingInterface";
import Logo from '../../../assets/veewBlackLogo.png'
import { toast } from "react-toastify";
import { createPayment, verifyPayment } from "../../../api/user";

interface cardProps {
  pricingData: IPricingPlan[];
  plan: "PRICING" | "SUBSCRIPTION";
}

interface RazorpayResponse {
  orderCreationId:string
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}


declare global {
  interface Window {
    Razorpay: any; 
  }
}

const SubscriptionCards: React.FC<cardProps> = ({ pricingData, plan }) => {
  const descriptionStr = (count: number) => {
    let str = "";
    if (plan === "PRICING") {
      str = count === 1 ? `${count} online event` : `${count} online events`;
    } else if (plan === "SUBSCRIPTION") {
      str =
        count === 1
          ? `${count} online event per month`
          : `${count} online events per month`;
    }

    return str;
  };


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            console.log("Razorpay SDK loaded successfully");
            resolve(true);
        };
        script.onerror = () => {
            console.error("Razorpay SDK failed to load");
            resolve(false);
        };
        document.body.appendChild(script);
    });
};


async function displayRazorpay(planId:string) {
  try {
    const res = await loadRazorpayScript();

  if (!res) {
    toast.error("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await createPayment(planId);

  if (!result) {
      toast.error("Server error. Are you online?");
      return;
  }

  const { amount, id: orderId, currency , key} = result.data;

  const options = {
    key: key,
    amount: amount.toString(),
    currency: currency,
    name: "veew",
    description: "virtual event hosting platform",
    image: Logo,
    order_id: orderId,
    handler: async function (response: RazorpayResponse) {
      const data = {
        orderCreationId: orderId,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        planId:planId
      };
  
      const result = await verifyPayment(data);
      alert(result.data.msg);
    },
      prefill: {
          name: "veew admin",
          email: "veew@example.com",
          contact: "9999999999",
      },
      notes: {
          address: "veew co-operative Office",
      },
      theme: {
          color: "#002e51",
      },
  };

  const paymentObject = new window.Razorpay(options);

  // paymentObject.on('payment.failed', function(){
  //   toast.error('Payment Failed')
  // });
  paymentObject.open();
  } catch (error) {
    console.log("errrrrrrrrr ::::",error);
    
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
                  <button onClick={()=>displayRazorpay(data.id)}>BUY NOW</button>
                </div>
                <div>
                  <div className="plan-descriptions">
                    <p className="plan-feature">
                      {" "}
                      {`Host ${descriptionStr(data.numberOfEvents)}`}{" "}
                    </p>
                    <p className="desctiption">{`Conduct a ${descriptionStr(
                      data.numberOfEvents
                    )} online event tailored to your needs  with a straightforward and easy setup`}</p>
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
