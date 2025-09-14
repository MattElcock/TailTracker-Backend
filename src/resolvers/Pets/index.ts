import { createPet } from "@/resolvers/Pets/mutations/createPet.js";
import { enclosure } from "@/resolvers/Pets/queries/enclosure.js";
import { pets } from "@/resolvers/Pets/queries/pets.js";
import { petSubtypes } from "@/resolvers/Pets/queries/petSubtypes.js";
import { petTypes } from "@/resolvers/Pets/queries/petTypes.js";
import { subtype } from "@/resolvers/Pets/queries/subtype.js";
import { type } from "@/resolvers/Pets/queries/type.js";

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
