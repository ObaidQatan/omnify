import { INVALID_TOKEN, NO_TOKEN_PROVIDED } from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";
import jwt from "jsonwebtoken";

export default function authenticate(req: Request, res: Response, next?: any) {
  console.log("authenticate");
  const token = (req.headers.authorization as string)?.split(" ")[1];
  if (!token) {
    res.statusCode = 403;
    console.log("Token not valid block");
    throw NO_TOKEN_PROVIDED;
  }

  try {
    console.log("Token is valid");
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );
    req.user = decoded;
    console.log({ decoded });
  } catch (error) {
    res.statusCode = 401;
    throw INVALID_TOKEN;
  }

  console.log("Authenticated!!!!");

  typeof next === "function" && next(req, res);
}
