import {
  NO_BODY_IN_REQUEST,
  USERNAME_AND_PASSWORD_ARE_REQUIRED,
} from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";

export default function checkCredentials(
  req: Request,
  res: Response,
  next?: any
) {
  if (!req.body) {
    res.statusCode = 400;
    throw NO_BODY_IN_REQUEST;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.statusCode = 400;
    throw USERNAME_AND_PASSWORD_ARE_REQUIRED;
  }

  typeof next === "function" && next(req, res);
}
