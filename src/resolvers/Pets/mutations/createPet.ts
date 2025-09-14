import { createPetDb } from "@/db/Pets/createPetDb.js";
import { Pet } from "@/resolvers/types/Pets.js";

interface Args {
  pet: {
    enclosureId: string;
    subtype_id: string;
    name: string;
  };
}

interface CreatePetResolverReturn
  extends Omit<Pet, "enclosure" | "type" | "subtype"> {
  enclosure: string;
  subtype: string;
}

const createPet = async (
  _parent: undefined,
  { pet }: Args
): Promise<CreatePetResolverReturn> => {
  const dbPet = await createPetDb({
    name: pet.name,
    enclosure_id: pet.enclosureId,
    subtype_id: pet.subtype_id,
  });

  return {
    id: dbPet.id,
    subtype: dbPet.subtype_id,
    name: dbPet.name,
    enclosure: dbPet.enclosure_id,
  };
};

export { createPet };
