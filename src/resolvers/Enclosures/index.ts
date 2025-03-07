import { createEnclosure } from "./createEnclosure";
import { enclosures } from "./enclosures";
import { pets } from "./pets";

const resolvers = {
  Query: {
    enclosures,
  },
  Mutation: {
    createEnclosure,
  },
  Enclosure: {
    pets,
  },
};

export default resolvers;
