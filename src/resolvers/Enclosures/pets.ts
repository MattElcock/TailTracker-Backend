import { Context } from "types";
import { listPetsDb } from "db/Pets/listPetsDb";
import { Pet } from "resolvers/types.ts/Pets";

const pets = async (enclosure, _args, { user }: Context): Promise<Pet[]> => {
  const pets = await listPetsDb({
    pets: { enclosureId: enclosure.id },
    enclosures: { ownerId: user.id },
  });

  return pets.map((pet) => ({
    id: pet.id,
    name: pet.name,
    type: pet.type,
    subtype: pet.subtype,
  }));
};

export { pets };
