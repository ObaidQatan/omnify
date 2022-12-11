import plansController from "../../../src/controllers/plansController";
import { SOMETHING_WENT_WRONG } from "../../../src/errors";
import { Request } from "../../../src/types/Request";
import { Response } from "../../../src/types/Response";

export default async function plans(req: Request, res: Response) {
  try {
    // TODO: Check if accessToken is valid
    // authenticate(req, res);
    // TODO: Check if user is super admin
    console.log("plans Api");
  } catch (error) {
    if (typeof error === "string") {
      return res.json({ message: SOMETHING_WENT_WRONG, error });
    } else {
      return res.json({
        message: SOMETHING_WENT_WRONG,
        error: (error as { message: string })?.message,
      });
    }
  }

  return await plansController(req, res);
}
