import { Country } from "./Country";

export type Currency = {
  id: number;
  nameEn: string;
  code: string;
  symbol: string;
  country: Country;
};
