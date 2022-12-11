import prisma from "../../../db/connector";
import { USER_NOT_FOUND, SOMETHING_WENT_WRONG } from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";
import * as jwt from "jsonwebtoken";

export default async function updateRoleController(
  req: Request,
  res: Response
) {
  // TODO: Get user by id from the database
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.query.id as string,
      },
    });

    if (!user) {
      res.statusCode = 404;
      throw USER_NOT_FOUND;
    }
    console.log({ userInRequest: req.body.user });

    console.log({ dobInRequest: req.body.user.dob });

    const updatedUser = await prisma.user.update({
      where: {
        id: req.query.id as string,
      },
      data: {
        // update nationality if exists
        ...req.body.user,
      },
      include: {
        subscriptions: {
          where: {
            endDate: {
              gte: new Date().toISOString(),
            },
          },
          include: {
            bike: true,
            plan: true,
          },
        },
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
        message: "User updated successfully",
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
