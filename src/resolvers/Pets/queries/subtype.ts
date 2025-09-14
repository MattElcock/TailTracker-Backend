import { getPetSubtypeByIdDb } from "@/db/Pets/getPetSubtypeByIdDb.js";
import { PetSubtype } from "@/db/Pets/types.js";
import { PetsResolverReturn } from "./pets.js";

interface ResolverReturn {
  id: string;
  name: PetSubtype;
}

const subtype = async (parent: PetsResolverReturn): Promise<ResolverReturn> => {
  const subtype = await getPetSubtypeByIdDb(parent.subtype);

  return { id: subtype.id, name: subtype.name };
};

export { subtype };
