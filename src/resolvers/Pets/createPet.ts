import { createEnclosureDb } from "db/Enclosures/createEnclosureDb";
import { Context } from "types";
import { Pet } from "../types.ts/Pets";
import { createPetDb } from "db/Pets/createPetDb";
import { PetSubtype } from "db/Pets/types";

interface Args {
  pet: {
    enclosureId: string;
    subtype: PetSubtype;
    name: string;
  };
}
const createPet = async (_, { pet }: Args): Promise<Pet> => {
  const dbPet = await createPetDb({
    name: pet.name,
    enclosure_id: pet.enclosureId,
    subtype: pet.subtype,
  });

  return {
    id: dbPet.id,
    type: dbPet.type,
    subtype: dbPet.subtype,
    name: dbPet.name,
  };
};

export { createPet };
