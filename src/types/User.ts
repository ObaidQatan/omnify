import { Subscription } from "./Subscription";

export type User = {
  id: string;
  username: string;
  password?: string | null;
  email?: string;
  name?: string;
  subscriptions?: Subscription[];
  role?: "ADMIN" | "USER";
};
