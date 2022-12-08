import bikeController from "../../../../src/controllers/bike/bikeController";
import { SOMETHING_WENT_WRONG } from "../../../../src/errors";
import { Request } from "../../../../src/types/Request";
import { Response } from "../../../../src/types/Response";

export default async function bike(req: Request, res: Response) {
  console.log("get bike by id");
  try {
    // TODO: Check if access token is valid
    // authenticate(req, res);
    // TODO: Check if access token has super admin role
    // checkRole("admin", req, res);
    // TODO: Check if user exists in request body
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

  return await bikeController(req, res);
}
