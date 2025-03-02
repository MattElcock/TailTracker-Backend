import { createUser } from "./createUser";
import { listUsers as users } from "./listUsers";

const resolvers = {
  Query: {
    users,
  },
  Mutation: { createUser },
};

export default resolvers;
