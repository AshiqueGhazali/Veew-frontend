export interface IPricingPlan {
  id: string;
  title: string;
  category: "PRICING" | "SUBSCRIPTION";
  price: number;
  numberOfEvents: number;
  expireAfter?: number;
  maxParticipents: number;
  idealFor: string;
}
