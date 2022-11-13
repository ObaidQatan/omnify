import prisma from "../../../db/connector";
import {
  USER_NOT_FOUND,
  SOMETHING_WENT_WRONG,
  USERNAME_IS_ALREADY_TAKEN,
} from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";
import * as jwt from "jsonwebtoken";
import encrypt from "../../util/encrypt";

export default async function registerRoleController(
  req: Request,
  res: Response
) {
  // TODO: Get user by id from the database
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.user.username as string,
      },
    });

    if (user) {
      // TODO: username is already taken
      res.statusCode = 400;
      throw USERNAME_IS_ALREADY_TAKEN;
    }

    console.log({ userInRequest: req.body.user });

    console.log({ dobInRequest: req.body.user.dob });

    const updatedUser = await prisma.user.update({
      where: {
        id: req.query.id as string,
      },
      data: {
        username: req.body.user.username as string,
        password: encrypt(req.body.user.password as string),
      },
    });

    try {
      const accessToken = jwt.sign(
        { ...updatedUser, password: null },
        process.env.NEXT_PUBLIC_JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        user: {
          ...updatedUser,
          accessToken,
        },
        message: "User registered successfully",
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
