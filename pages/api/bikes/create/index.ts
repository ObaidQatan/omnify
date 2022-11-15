import createBikeController from "../../../../src/controllers/bike/createBikeController";
import { BIKE_IS_REQUIRED, SOMETHING_WENT_WRONG } from "../../../../src/errors";
import authenticate from "../../../../src/middlewares/auth/authenticate";
import checkRole from "../../../../src/middlewares/checkRole";
import { Request } from "../../../../src/types/Request";
import { Response } from "../../../../src/types/Response";

export default async function create(req: Request, res: Response) {
  console.log("create user");
  try {
    // TODO: Check if access token is valid
    authenticate(req, res);
    // TODO: Check if access token has super admin role
    checkRole("admin", req, res);
    // TODO: Check if user exists in request body
    if (!req.body.bike) {
      console.log("bike is required");
      res.statusCode = 400;
      throw BIKE_IS_REQUIRED;
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

  return await createBikeController(req, res);
}
