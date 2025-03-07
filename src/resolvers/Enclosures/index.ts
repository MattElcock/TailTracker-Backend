import { createEnclosure } from "./mutations/createEnclosure";
import { enclosures } from "./queries/enclosures";
import { pets } from "./queries/pets";
import { type } from "./queries/type";

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
