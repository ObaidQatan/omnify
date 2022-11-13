import { Subscription } from "./Subscription";

export type Bike = {
  id: string;
  name?: string;
  image?: string;
  createdAt?: string;
  subscriptions?: Subscription[];
};
