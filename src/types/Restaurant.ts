import { Account } from "./Account";
import { Language } from "./Language";
import { Plan } from "./Plan";

export type Restaurant = {
  id?: string;
  nameEn?: string;
  nameAr?: string;
  username: string;
  status: string;
  bussiness_license?: string;
  createdAt?: string;
  updatedAt?: string;
  last_loggin?: string;
  countryId?: string;
  cityId?: string;
  latitude?: string;
  longitude?: string;
  software_planId?: string;
  payment_preferenceId?: string;
  avatarId?: string;
  plan?: Plan;
  languages?: Language[];
  manager?: Account;
  manualCode?: string;
};
