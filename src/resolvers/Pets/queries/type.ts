import { getPetSubtypeByIdDb } from "@/db/Pets/getPetSubtypeByIdDb.js";
import { getPetTypeByIdDb } from "@/db/Pets/getPetTypeByIdDb.js";
import { PetType } from "@/db/Pets/types.js";
import { PetsResolverReturn } from "./pets.js";

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
