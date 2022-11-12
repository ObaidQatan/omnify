import { Role } from "./Role";
import { SystemService } from "./SystemService";
import { User } from "./User";

export type Account = {
  id: string;
  username: string;
  password?: string | null;
  email?: string;
  roleId?: number;
  createdAt?: string;
  visitedAt?: string;
  role: Role;
  services?: SystemService[];
  user?: User;
  userId?: number;
};
