import React, { useState } from "react";
import "./PricingCard.css";
import { IPricingPlan } from "../../../interface/pricingInterface";
import PricingAddAndEditModal from "../PricingAddAndEditModal/PricingAddAndEditModal";

interface pricingCardProp {
  plan: string;
  planData: IPricingPlan[] | null;
  search: string;
}

const PricingCard: React.FC<pricingCardProp> = ({ plan, planData, search }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editPlanData, setForEdit] = useState<IPricingPlan | null>(null);

  const setDescription = (count: number) => {
    let str = "";
    if (plan === "PRICING") {
      str =
        count === 1
          ? `Host ${count} online event `
          : `Host ${count} online events`;
    } else if (plan === "SUBSCRIPTION") {
      str =
        count === 1
          ? `Host ${count} online event per month`
          : `Host ${count} online events per month`;
    }

    return str;
  };

  const handleEditModal = (data: IPricingPlan) => {
    setForEdit(data);
    setIsEdit(true);
  };
  return (
    <>
      <div className="pricing-plans">
        {planData
          ?.filter((data) => {
            return (
              data.category.includes(plan) &&
              (data.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
                data.idealFor.toLowerCase().includes(search.toLowerCase()))
            );
          })
          .map((data, index) => {
            return (
              <div className="pricing-plan" key={index}>
                <p>{data.title}</p>
                <h2>₹ {data.price}</h2>
                <p className="plan-description">{`${
                  data.idealFor
                }, ${setDescription(data.numberOfEvents)}`}</p>
                <div className="plan-action-btn">
                  <button onClick={() => handleEditModal(data)}>Edit</button>
                  <button>Unlist</button>
                </div>
              </div>
            );
          })}
      </div>
      {isEdit && (
        <PricingAddAndEditModal
          isOpen={isEdit}
          onClose={() => setIsEdit(false)}
          isEdit={isEdit}
          planData={editPlanData}
        />
      )}
    </>
  );
};

export default PricingCard;
