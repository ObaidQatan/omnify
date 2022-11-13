// import { ACTION_NOT_ALLOWED, ROLE_IS_REQUIRED } from "../errors";
// import { Account } from "../types/Account";
// import { Request } from "../types/Request";
// import { Response } from "../types/Response";
// import { User } from "../types/User";

// export default function checkRole(
//   role_id: number,
//   req: Request,
//   res: Response,
//   next?: any
// ) {
//   const role = (req.user as User)?.accounts.find(
//     (account: Account) => account.role.role_id === role_id
//   )?.role;
//   console.log("Role from request", req.user.accounts);

//   if (!role) {
//     res.statusCode = 400;
//     throw ROLE_IS_REQUIRED;
//   }

//   console.log("==================================================");
//   console.log({ role_id, roleId: role.role_id });

//   if (role.role_id !== role_id) {
//     res.statusCode = 403;
//     console.log("Role not valid block");
//     console.log({
//       role_id,
//       role,
//     });
//     throw ACTION_NOT_ALLOWED;
//   }

//   typeof next === "function" && next(req, res);
// }

export {};
