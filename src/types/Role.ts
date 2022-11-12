import { Account } from "./Account";
import { Permission } from "./Permission";
import { Plan } from "./Plan";
import { PlanType } from "./PlanType";

export type Role = {
  id?: string;
  role_id?: number;
  nameEn?: string;
  nameAr?: string;
  permissions: Permission[];
  accounts?: Account[];
  plans?: PlanType[];
  createdAt?: string;
};
