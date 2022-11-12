import { City } from "./City";
import { Currency } from "./Currency";

export type Country = {
  id: number;
  nameEn: string;
  code?: string;
  numeric_code: string;
  phone_code: string;
  iso: string;
  region: string;
  subregion: string;
  timezone: string;
  translation: string;
  latitude: number;
  longitude: number;
  flag: number;
  wikiDataId: string;
  createdAt: string;
  updatedAt: string;
  capital: City;
  currency: Currency;
};
