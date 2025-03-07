import { createPet } from "./createPet";
import { enclosure } from "./enclosure";
import { pets } from "./pets";
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
