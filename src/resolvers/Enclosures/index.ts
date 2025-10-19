import { createEnclosure } from "./mutations/createEnclosure.js";
import { enclosures } from "./queries/enclosures.js";
import { pets } from "./queries/pets.js";
import { type } from "./queries/type.js";

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
