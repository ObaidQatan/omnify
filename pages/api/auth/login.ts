import loginController from "../../../src/controllers/loginController";
import { SOMETHING_WENT_WRONG } from "../../../src/errors";
import checkCredentials from "../../../src/middlewares/auth/checkCredentials";
import { Request } from "../../../src/types/Request";
import { Response } from "../../../src/types/Response";

export default async function login(req: Request, res: Response) {
  // TODO: check credentials then authenticate
  try {
    checkCredentials(req, res);
  } catch (error) {
    if (typeof error === "string") {
      return res.send({ message: SOMETHING_WENT_WRONG, error });
    }
    return res.send({
      message: SOMETHING_WENT_WRONG,
      error: (error as { message: string })?.message,
    });
  }

  return await loginController(req, res);
}
