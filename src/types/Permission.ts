import { Role } from "./Role";

export type Permission = {
  id?: string;
  title?: string;
  description?: string;
  roles?: Role[];
  createdAt?: string;
  updatedAt?: string;
};
