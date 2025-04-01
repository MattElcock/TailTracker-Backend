import { Context } from "types";

import { listPetsDb } from "db/Pets/listPetsDb";
import { Pet } from "resolvers/types/Pets";

export interface PetsResolverReturn
  extends Omit<Pet, "enclosure" | "type" | "subtype"> {
  enclosure: string;
  subtype: string;
}

const pets = async (
  _parent: void,
  _args: void,
  { user }: Context
): Promise<PetsResolverReturn[]> => {
  const pets = await listPetsDb({ enclosures: { ownerId: user.id } });

  return pets.map((pet) => ({
    id: pet.id,
    name: pet.name,
    subtype: pet.subtype_id,
    enclosure: pet.enclosure_id,
  }));
};

export { pets };
