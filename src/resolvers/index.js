import { extractFragmentReplacements } from "prisma-binding";
import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
import Subscription from "./Subscription";

// Resolvers (functions that run when various operations are performed)
const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
