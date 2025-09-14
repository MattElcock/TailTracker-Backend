import { type } from "os";
import { createEnclosure } from "./mutations/createEnclosure.js";
import { enclosures } from "./queries/enclosures.js";
import { pets } from "./queries/pets.js";

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
