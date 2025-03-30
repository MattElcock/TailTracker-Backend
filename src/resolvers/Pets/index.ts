import { createPet } from "./mutations/createPet";
import { enclosure } from "./queries/enclosure";
import { pets } from "./queries/pets";
import { petSubtypes } from "./queries/petSubtypes";
import { petTypes } from "./queries/petTypes";
import { subtype } from "./queries/subtype";
import { type } from "./queries/type";

const resolvers = {
  Query: {
    pets,
    petTypes,
    petSubtypes,
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
