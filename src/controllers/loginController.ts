import { Request } from "../types/Request";
import { Response } from "../types/Response";
import {
  PASSWORD_IS_INCORRECT,
  SOMETHING_WENT_WRONG,
  USER_NOT_FOUND,
} from "../errors";
import * as bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../db/connector";

export default async function loginController(req: Request, res: Response) {
  // TODO: Check if user exists with correct credentials
  // get user by username which is unique from the database
  // get the hashed password from the database
  // compare the hashed password with the password from the request

  try {
    console.log("Before findUnique");
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    console.log("After findUnique");
    // NOTE: this will target the username of a single user: Account which has a single role

    console.log({ user });

    if (!user) {
      return res
        .status(404)
        .send({ message: SOMETHING_WENT_WRONG, error: USER_NOT_FOUND });
    }

    // TODO: Validate password
    const isPasswordValid = bycrpt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(403)
        .send({ message: SOMETHING_WENT_WRONG, error: PASSWORD_IS_INCORRECT });
    }

    // TODO: Generate access token with jwt
    try {
      const accessToken = jwt.sign(
        { ...user, password: null },
        process.env.NEXT_PUBLIC_JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).send({
        message: "Login Successful",
        user: {
          ...user,
          password: null,
          accessToken,
        },
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
      return res.status(502).send({ message: SOMETHING_WENT_WRONG, error });
    } else {
      return res.status(502).send({
        message: SOMETHING_WENT_WRONG,
        error: (error as { message: string })?.message,
      });
    }
  }
}
