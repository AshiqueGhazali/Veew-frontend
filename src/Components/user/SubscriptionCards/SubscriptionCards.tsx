import React from "react";
import "./SubscriptionCards.css";
// import { CgEditBlackPoint } from "react-icons/cg";
import { IPricingPlan } from "../../../interface/pricingInterface";

interface cardProps {
  pricingData: IPricingPlan[];
  plan: "PRICING" | "SUBSCRIPTION";
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
                  <button>BUY NOW</button>
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