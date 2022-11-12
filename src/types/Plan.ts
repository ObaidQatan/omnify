import { PlanType } from "./PlanType";

export type Plan = {
  id?: string;
  type?: string; // weekly, monthly, etc.
  planType?: PlanType;
  planTypeId?: string;
};
