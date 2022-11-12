import { Request } from "../../src/types/Request";
import { Response } from "../../src/types/Response";

export default async function hello(req: Request, res: Response) {
  res.status(200).json({ name: "John Doe" });
}
