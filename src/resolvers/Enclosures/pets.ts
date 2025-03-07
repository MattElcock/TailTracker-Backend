import { Context } from "types";
import { listPetsDb } from "db/Pets/listPetsDb";
import { Pet } from "resolvers/types.ts/Pets";

interface PetsResolverReturn extends Omit<Pet, "enclosure"> {
  enclosure: string;
}

const pets = async (
  enclosure,
  _args,
  { user }: Context
): Promise<PetsResolverReturn[]> => {
  const pets = await listPetsDb({
    pets: { enclosureId: enclosure.id },
    enclosures: { ownerId: user.id },
  });

  return pets.map((pet) => ({
    id: pet.id,
    name: pet.name,
    type: pet.type,
    subtype: pet.subtype,
    enclosure: pet.enclosure_id,
  }));
};

export { pets };
