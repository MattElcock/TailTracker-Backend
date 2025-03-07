import { createPet } from "./mutations/createPet";
import { enclosure } from "./queries/enclosure";
import { pets } from "./queries/pets";
import { subtype } from "./subtype";
import { type } from "./type";

const resolvers = {
  Query: {
    pets,
  },
  Mutation: {
    createPet,
  },
  Pet: {
    enclosure,
    type,
    subtype,
  },
};

export default resolvers;
