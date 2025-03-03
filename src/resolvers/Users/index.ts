import { createUser } from "./createUser";
import { listUsers as users } from "./listUsers";
import { updateUser } from "./updateUser";

const resolvers = {
  Query: {
    users,
  },
  Mutation: { createUser, updateUser },
};

export default resolvers;
