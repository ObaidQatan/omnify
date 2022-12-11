import { USER_ALREADY_EXIST, SOMETHING_WENT_WRONG } from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";
import prisma from "../../../db/connector";
import encrypt from "../../util/encrypt";
import jwt from "jsonwebtoken";

export default async function createBikeController(
  req: Request,
  res: Response
) {
  // TODO: Get restaurant by title from the database
  console.log({
    bikeInBody: req.body.bike,
  });
  try {
    const createdBike = await prisma.bike.create({
      data: {
        name: req.body.bike.name as string,
        description: req.body.bike.description,
        image: req.body.bike.image,
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

    return res.status(200).json({
      bike: {
        ...createdBike,
      },
      message: "Bike created successfully",
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
