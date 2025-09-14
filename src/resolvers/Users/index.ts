import { createUser } from "./mutations/createUser.js";
import { updateUser } from "./mutations/updateUser.js";
import { me } from "./queries/me.js";

const resolvers = {
  Query: {
    me,
  },
  Mutation: { createUser, updateUser },
};

export default resolvers;
