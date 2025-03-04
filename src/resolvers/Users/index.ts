import { createUser } from "./createUser";
import { me } from "./me";
import { updateUser } from "./updateUser";

const resolvers = {
  Query: {
    me,
  },
  Mutation: { createUser, updateUser },
};

export default resolvers;
