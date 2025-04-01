import { getPetSubtypeByIdDb } from "db/Pets/getPetSubtypeByIdDb";
import { getPetTypeByIdDb } from "db/Pets/getPetTypeByIdDb";
import { PetSubtype, PetType } from "db/Pets/types";
import { PetsResolverReturn } from "./pets";

interface ResolverReturn {
  id: string;
  name: PetType;
}

const type = async (parent: PetsResolverReturn): Promise<ResolverReturn> => {
  const subtype = await getPetSubtypeByIdDb(parent.subtype);
  const type = await getPetTypeByIdDb(subtype.type_id);

  return { id: type.id, name: type.name };
};

export { type };
