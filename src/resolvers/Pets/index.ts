import { createPet } from "./createPet";
import { pets } from "./pets";

const resolvers = {
  Query: {
    pets,
  },
  Mutation: {
    createPet,
  },
};

export default resolvers;
