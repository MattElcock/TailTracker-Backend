import { getPetSubtypeByIdDb } from "db/Pets/getPetSubtypeByIdDb";
import { PetSubtype } from "db/Pets/types";
import { PetsResolverReturn } from "./pets";

interface ResolverReturn {
  id: string;
  name: PetSubtype;
}

const subtype = async (parent: PetsResolverReturn): Promise<ResolverReturn> => {
  const subtype = await getPetSubtypeByIdDb(parent.subtype);

  return { id: subtype.id, name: subtype.name };
};

export { subtype };
