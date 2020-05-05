import getUserId from "../utils/getUserId";

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const userExists = await prisma.exists.User({
      id: userId,
    });

    if (!userExists) {
      throw new Error("Unable to find user");
    }

    return await prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
};

export { Query as default };
