import { BIKE_NOT_FOUND, SOMETHING_WENT_WRONG } from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";
import prisma from "../../../db/connector";

export default async function bikeController(req: Request, res: Response) {
  try {
    // TODO: Get all bike from the database
    const bike = await prisma.bike.findUnique({
      where: {
        id: req.query.id as string,
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

    if (!bike) {
      throw BIKE_NOT_FOUND;
    }

    return res.json({
      message: "Bike fetched successfully",
      bike,
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
