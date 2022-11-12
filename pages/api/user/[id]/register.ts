import registerUserController from "../../../../src/controllers/user/registerUserController";
import {
  USER_IS_REQUIRED,
  SOMETHING_WENT_WRONG,
  PASSWORDS_DO_NOT_MATCH,
} from "../../../../src/errors";
import authenticate from "../../../../src/middlewares/auth/authenticate";
import { Request } from "../../../../src/types/Request";
import { Response } from "../../../../src/types/Response";

export default async function register(req: Request, res: Response) {
  console.log("register user");
  try {
    // TODO: Check if user exists in request body
    if (!req.body.user) {
      res.statusCode = 400;
      throw USER_IS_REQUIRED;
    }

    if (req.body.user.password !== req.body.user.confirmPassword) {
      res.statusCode = 400;
      throw PASSWORDS_DO_NOT_MATCH;
    }

    // NOTE: ID will always be available because of dynamic path routing
  } catch (error) {
    if (typeof error === "string") {
      return res.json({
        message: SOMETHING_WENT_WRONG,
        error: error,
      });
    } else {
      return res.json({
        message: SOMETHING_WENT_WRONG,
        error: (error as { message: string })?.message,
      });
    }
  }

  return await registerUserController(req, res);
}
