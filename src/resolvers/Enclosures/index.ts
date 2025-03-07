import { createEnclosure } from "./createEnclosure";
import { enclosures } from "./enclosures";
import { pets } from "./pets";
import { type } from "./type";

const resolvers = {
  Query: {
    enclosures,
  },
  Mutation: {
    createEnclosure,
  },
  Enclosure: {
    pets,
    type,
  },
};

export default resolvers;
