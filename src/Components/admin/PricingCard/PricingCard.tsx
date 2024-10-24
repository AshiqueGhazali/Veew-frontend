import React, { useState } from "react";
import "./PricingCard.css";
import { IPricingPlan } from "../../../interface/pricingInterface";
import PricingAddAndEditModal from "../PricingAddAndEditModal/PricingAddAndEditModal";
import { deletePlan } from "../../../api/admin";
import { toast } from "react-toastify";

interface pricingCardProp {
  plan: string;
  planData: IPricingPlan[] | null;
  search: string;
  isEdit:boolean;
  setIsEdit:(status:boolean)=>void
}

const PricingCard: React.FC<pricingCardProp> = ({ plan, planData, search , isEdit, setIsEdit}) => {
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

  const handleDelete = async(planId:string)=>{
      const cardElement = document.querySelector(`.pricing-plan[data-id="${planId}"]`);
  
      if (cardElement) {
        cardElement.classList.add('removing');
      }
      
      setTimeout(async () => {
        try {
          const response = await deletePlan(planId);
          if (response.status === 200) {
            toast.success(response.data.message);
            setIsEdit(false);
          }
        } catch (error) {
          console.log(error);
        }
      }, 500); 
  }
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
                  <button onClick={()=>handleDelete(data.id)}>Delete</button>
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
