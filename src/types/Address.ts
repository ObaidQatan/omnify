import { City } from "@prisma/client";
import { Country } from "./Country";

export type Address = {
  id: string;
  country?: Country;
  city?: City;
  streetName?: string;
  streetNumber?: string;
  buildingNumber?: string;
  buildingName?: string;
  areaName?: string;
  landmark?: string;
};
