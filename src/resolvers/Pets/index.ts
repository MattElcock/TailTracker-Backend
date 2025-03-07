import { createPet } from "./createPet";
import { enclosure } from "./enclosure";
import { pets } from "./pets";

const resolvers = {
  Query: {
    pets,
  },
  Mutation: {
    createPet,
  },
  Pet: {
    enclosure,
  },
};

export default resolvers;
