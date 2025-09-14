import { listPetsDb } from "@/db/Pets/listPetsDb.js";
import { Pet } from "@/resolvers/types/Pets.js";
import { Context } from "@/types.js";
import { EnclosuresResolverReturn } from "./enclosures.js";

interface PetsResolverReturn
  extends Omit<Pet, "enclosure" | "type" | "subtype"> {
  enclosure: string;
  subtype: string;
}

const pets = async (
  enclosure: EnclosuresResolverReturn,
  _args: void,
  { user }: Context
): Promise<PetsResolverReturn[]> => {
  const pets = await listPetsDb({
    pets: { enclosureId: enclosure.id },
    enclosures: { ownerId: user.id },
  });

  return pets.map((pet) => ({
    id: pet.id,
    name: pet.name,
    subtype: pet.subtype_id,
    enclosure: pet.enclosure_id,
  }));
};

export { pets };
