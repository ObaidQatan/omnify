import { PLANS_NOT_FOUND, SOMETHING_WENT_WRONG } from "../errors";
import { Request } from "../types/Request";
import { Response } from "../types/Response";
import prisma from "../../db/connector";

export default async function plansController(req: Request, res: Response) {
  try {
    // TODO: Get all plans from the database
    const plans = await prisma.plan.findMany({
      include: {
        subscriptions: {
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

    if (!plans) {
      throw PLANS_NOT_FOUND;
    }

    return res.json({
      message: "plans fetched successfully",
      plans,
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
