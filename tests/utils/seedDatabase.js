import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

const userOne = {
  input: {
    name: "test user",
    email: "test@test.com",
    password: bcrypt.hashSync("test1234"),
  },
  user: undefined,
  jwt: undefined,
};

const userTwo = {
  input: {
    name: "second test user",
    email: "secondtest@test.com",
    password: bcrypt.hashSync("test1234"),
  },
  user: undefined,
  jwt: undefined,
};

const seedDatabase = async () => {
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  userOne.jwt = jwt.sign(
    { userId: userOne.user.id },
    process.env.PRISMA_JWT_SECRET
  );

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });

  userTwo.jwt = jwt.sign(
    { userId: userTwo.user.id },
    process.env.PRISMA_JWT_SECRET
  );
};

export { seedDatabase as default, userOne, userTwo };
