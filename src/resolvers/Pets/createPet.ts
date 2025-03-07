import { createPetDb } from "db/Pets/createPetDb";
import { PetSubtype } from "db/Pets/types";
import { Pet } from "../types.ts/Pets";

interface Args {
  pet: {
    enclosureId: string;
    subtype: PetSubtype;
    name: string;
  };
}

interface CreatePetResolverReturn extends Omit<Pet, "enclosure"> {
  enclosure: string;
}

const createPet = async (
  _,
  { pet }: Args
): Promise<CreatePetResolverReturn> => {
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
    enclosure: dbPet.enclosure_id,
  };
};

export { createPet };
