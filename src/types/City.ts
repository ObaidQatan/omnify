import { Country } from "./Country";

export type City = {
  id: number;
  nameEn: string;
  code?: string;
  country: Country;
  latitude?: number;
  longitude?: number;
};
