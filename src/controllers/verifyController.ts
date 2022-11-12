import { Request } from "../types/Request";
import { Response } from "../types/Response";

export default async function verifyController(req: Request, res: Response) {
  console.log({ userFromApi: req.user });

  return res
    .status(200)
    .send({ message: "Token is valid", valid: true, user: req.user });
}
