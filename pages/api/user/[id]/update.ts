import updateUserController from "../../../../src/controllers/user/updateUserController";
import {
  USER_IS_REQUIRED,
  SOMETHING_WENT_WRONG,
  YOU_ARE_NOT_AUTHORIZED_TO_UPDATE_THIS_USER,
} from "../../../../src/errors";
import authenticate from "../../../../src/middlewares/auth/authenticate";
import { Request } from "../../../../src/types/Request";
import { Response } from "../../../../src/types/Response";

export default async function update(req: Request, res: Response) {
  console.log("update user");
  try {
    // TODO: Check if access token is valid
    authenticate(req, res);
    // TODO: Check if user exists in request body
    if (!req.body.user) {
      res.statusCode = 400;
      throw USER_IS_REQUIRED;
    }

    if (req.user.id !== req.body.user.id) {
      res.statusCode = 401;
      throw YOU_ARE_NOT_AUTHORIZED_TO_UPDATE_THIS_USER;
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

  return await updateUserController(req, res);
}
