import { lowerCase } from "lodash";
import { ACTION_NOT_ALLOWED, ROLE_IS_REQUIRED } from "../errors";
import { Request } from "../types/Request";
import { Response } from "../types/Response";
import { User } from "../types/User";

export default function checkRole(
  role: string,
  req: Request,
  res: Response,
  next?: any
) {
  console.log("Role from request", req.user?.role);

  if (!role) {
    res.statusCode = 400;
    throw ROLE_IS_REQUIRED;
  }

  console.log("==================================================");

  if (lowerCase(role) !== lowerCase(req.user?.role)) {
    res.statusCode = 403;
    console.log("Role not valid block");
    console.log({
      role,
      userRole: req.user?.role,
    });
    throw ACTION_NOT_ALLOWED;
  }

  typeof next === "function" && next(req, res);
}
