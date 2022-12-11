import { BIKES_NOT_FOUND, SOMETHING_WENT_WRONG } from "../errors";
import { Request } from "../types/Request";
import { Response } from "../types/Response";
import prisma from "../../db/connector";

export default async function bikesController(req: Request, res: Response) {
  try {
    // TODO: Get all bikes from the database
    const bikes = await prisma.bike.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!bikes) {
      throw BIKES_NOT_FOUND;
    }

    return res.json({
      message: "Bikes fetched successfully",
      bikes,
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
