import { createUser } from "./mutations/createUser";
import { updateUser } from "./mutations/updateUser";
import { me } from "./queries/me";

const resolvers = {
  Query: {
    me,
  },
  Mutation: { createUser, updateUser },
};

export default resolvers;
