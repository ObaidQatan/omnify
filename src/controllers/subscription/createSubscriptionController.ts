import { SOMETHING_WENT_WRONG } from "../../errors";
import { Request } from "../../types/Request";
import { Response } from "../../types/Response";
import prisma from "../../../db/connector";

export default async function createSubscriptionController(
  req: Request,
  res: Response
) {
  // TODO: Get restaurant by title from the database
  console.log({
    subscriptionInBody: req.body.subscription,
  });
  try {
    const plan = await prisma.plan.findUnique({
      where: {
        id: req.body.subscription.planId,
      },
    });

    const createdSubsrciption = await prisma.subscription.create({
      data: {
        plan: {
          connect: {
            id: req.body.subscription.planId,
          },
        },
        bike: {
          connect: {
            id: req.body.subscription.bikeId,
          },
        },
        user: {
          connect: {
            id: req.user?.id,
          },
        },
        startDate: new Date().toISOString(),
        /** according to plan.type, it can be after one day or one month or one year */
        endDate:
          plan?.type === "DAILY"
            ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
            : plan?.type === "MONTHLY"
            ? new Date(
                new Date().getTime() + 30 * 24 * 60 * 60 * 1000
              ).toISOString()
            : new Date(
                new Date().getTime() + 365 * 24 * 60 * 60 * 1000
              ).toISOString(),
      },
      include: {
        bike: true,
        plan: true,
        user: true,
      },
    });

    return res.status(200).json({
      subscription: {
        ...createdSubsrciption,
      },
      message: "subscription created successfully",
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
