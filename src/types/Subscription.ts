import { Plan } from "@prisma/client";
import { Bike } from "./Bike";
import { User } from "./User";

export type Subscription = {
  id: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  user?: User;
  bike?: Bike;
  bikeId?: string;
  userId?: string;
  planId?: string;
  plan?: Plan;
};
