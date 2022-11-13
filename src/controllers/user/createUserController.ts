import { USER_ALREADY_EXIST, SOMETHING_WENT_WRONG } from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";
import prisma from "../../../db/connector";
import encrypt from "../../util/encrypt";
import jwt from "jsonwebtoken";

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
        username: req.body.user.username as string,
        password: encrypt(req.body.user.password as string),
      },
      include: {
        subscriptions: true,
      },
    });

    try {
      const accessToken = jwt.sign(
        { ...createdUser, password: null },
        process.env.NEXT_PUBLIC_JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        user: {
          ...createdUser,
          accessToken,
        },
        message: "User created successfully",
      });
    } catch (error) {
      if (typeof error === "string") {
        return res.status(501).send({ message: SOMETHING_WENT_WRONG, error });
      } else {
        return res.status(501).send({
          message: SOMETHING_WENT_WRONG,
          error: (error as { message: string })?.message,
        });
      }
    }
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
