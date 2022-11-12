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
        nationality: req.body.user.nationality
          ? {
              connect: {
                id: req.body.user.nationality.id,
              },
            }
          : undefined,
        language: req.body.user.language
          ? {
              connect: {
                id: req.body.user.language.id,
              },
            }
          : undefined,
        gender: req.body.user.gender
          ? {
              connect: {
                id: req.body.user.gender.id,
              },
            }
          : undefined,
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
