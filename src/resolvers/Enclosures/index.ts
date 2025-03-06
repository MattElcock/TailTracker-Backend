import { createEnclosure } from "./createEnclosure";
import { enclosures } from "./enclosures";

const resolvers = {
  Query: {
    enclosures,
  },
  Mutation: {
    createEnclosure,
  },
};

export default resolvers;
