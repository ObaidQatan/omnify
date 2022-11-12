import verifyController from "../../../src/controllers/verifyController";
import { SOMETHING_WENT_WRONG } from "../../../src/errors";
import authenticate from "../../../src/middlewares/auth/authenticate";
import { Request } from "../../../src/types/Request";
import { Response } from "../../../src/types/Response";

export default async function verify(req: Request, res: Response) {
  // TODO: authenticate account
  try {
    authenticate(req, res);
  } catch (error) {
    if (typeof error === "string") {
      return res.send({ message: SOMETHING_WENT_WRONG, error, valid: false });
    } else {
      return res.send({
        message: SOMETHING_WENT_WRONG,
        error: (error as { message: string })?.message,
        valid: false,
      });
    }
  }

  return await verifyController(req, res);
}
