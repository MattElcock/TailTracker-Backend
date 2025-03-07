import { Context } from "types";
import { Pet } from "../types.ts/Pets";
import { listPetsDb } from "db/Pets/listPetsDb";

interface ResolverReturn extends Omit<Pet, "enclosure"> {
  enclosure: string;
}

const pets = async (
  _parent,
  _args,
  { user }: Context
): Promise<ResolverReturn[]> => {
  const pets = await listPetsDb({ enclosures: { ownerId: user.id } });

  return pets.map((pet) => ({
    id: pet.id,
    name: pet.name,
    type: pet.type,
    subtype: pet.subtype,
    enclosure: pet.enclosure_id,
  }));
};

export { pets };
