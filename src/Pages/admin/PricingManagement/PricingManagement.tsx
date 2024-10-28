import React, { useEffect, useState } from "react";
import "./PricingManagement.css";
import PricingCard from "../../../Components/admin/PricingCard/PricingCard";
import PricingAddAndEditModal from "../../../Components/admin/PricingAddAndEditModal/PricingAddAndEditModal";
import { IPricingPlan } from "../../../interface/pricingInterface";
import { getPlans } from "../../../api/admin";
import Subscribers from "../../../Components/admin/Subscribers/Subscribers";

interface pricingMangmntProps {
  search: string;
}

const PricingManagement: React.FC<pricingMangmntProps> = ({ search }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [allPlans, setAllPlan] = useState<IPricingPlan[] | null>(null);
  const [plan, setPlan] = useState<"PRICING" | "SUBSCRIPTION">("PRICING");

  const getAllPlans = async () => {
    try {
      const response = await getPlans();
      if (response.status === 200) {
        console.log(response);
        setAllPlan(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, [isModalOpen, isEdit]);

  const activePlan = (str: string) => {
    return plan === str ? "active" : "";
  };

  return (
    <>
      <div>
        <div className="pricing-btn">
          <div className="oprion-btn">
            <button
              className={activePlan("PRICING")}
              onClick={() => setPlan("PRICING")}
            >
              Pricing
            </button>
            <button
              className={activePlan("SUBSCRIPTION")}
              onClick={() => setPlan("SUBSCRIPTION")}
            >
              Subscription
            </button>
          </div>
          <div className="add-btn">
            <button onClick={() => setModalOpen(true)}>Add plan</button>
          </div>
        </div>
        <PricingCard plan={plan} planData={allPlans} search={search} isEdit={isEdit} setIsEdit={setIsEdit}/>
        <Subscribers/>
      </div>
      {isModalOpen && (
        <PricingAddAndEditModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default PricingManagement;
