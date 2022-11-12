import { PrismaClient } from "@prisma/client";
import encrypt from "../src/util/encrypt";
const prisma = new PrismaClient();

async function main() {}
// seed here
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
