import { Plan } from "./Plan";
import { Role } from "./Role";

export type PlanType = {
  id?: string;
  nameEn?: string;
  nameAr?: string;
  price?: number;
  descriptionEn?: string;
  descriptionAr?: string;
  plans?: Plan[];
  roles?: Role[];
};
