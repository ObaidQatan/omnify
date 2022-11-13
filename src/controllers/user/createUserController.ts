import { USER_ALREADY_EXIST, SOMETHING_WENT_WRONG } from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";
import prisma from "../../../db/connector";

export default async function createUserController(
  req: Request,
  res: Response
) {
  // TODO: Get restaurant by title from the database
  console.log({
    userInBody: req.body.user,
  });
  try {
    const existUser = await prisma.user.findUnique({
      where: {
        username: req.body.user.username,
      },
    });
    if (existUser) {
      res.statusCode = 400;
      throw USER_ALREADY_EXIST;
    }

    const createdUser = await prisma.user.create({
      data: {
        ...req.body.user,
      },
    });

    return res.status(200).json({
      user: createdUser,
      message: "User created successfully",
    });
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
}
