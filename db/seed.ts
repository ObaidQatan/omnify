import { PrismaClient } from "@prisma/client";
import encrypt from "../src/util/encrypt";
const prisma = new PrismaClient();

async function main() {
  // seed here
  // remove all users
  await prisma.user.deleteMany();
  // create admin user
  await prisma.user.create({
    data: {
      email: "admin@localhost",
      password: encrypt("admin123"),
      username: "admin",
      role: "ADMIN",
    },
  });

  // remove all bikes
  await prisma.bike.deleteMany();
  // add many bikes
  await prisma.bike.createMany({
    data: [
      {
        name: "Bike 1",
      },
      {
        name: "Bike 2",
      },
      {
        name: "Bike 3",
      },
      {
        name: "Bike 4",
      },
      {
        name: "Bike 5",
      },
      {
        name: "Bike 6",
      },
      {
        name: "Bike 7",
      },
      {
        name: "Bike 8",
      },
      {
        name: "Bike 9",
      },
      {
        name: "Bike 10",
      },
      {
        name: "Bike 11",
      },
      {
        name: "Bike 12",
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
