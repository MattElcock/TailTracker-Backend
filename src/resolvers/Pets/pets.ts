import { Context } from "types";
import { Pet } from "./types";
import { listPetsDb } from "db/Pets/listPetsDb";

const pets = async (_parent, _args, { user }: Context): Promise<Pet[]> => {
  const pets = await listPetsDb(user.id);

  return pets.map((pet) => ({
    id: pet.id,
    name: pet.name,
    type: pet.type,
    subtype: pet.subtype,
  }));
};

export { pets };
