import { getPetSubtypeByIdDb } from "db/Pets/getPetSubtypeByIdDb";
import { getPetTypeByIdDb } from "db/Pets/getPetTypeByIdDb";
import { PetSubtype, PetType } from "db/Pets/types";

interface ResolverReturn {
  id: string;
  name: PetType;
}

const type = async (parent): Promise<ResolverReturn> => {
  const subtype = await getPetSubtypeByIdDb(parent.subtype);
  const type = await getPetTypeByIdDb(subtype.type_id);

  return { id: type.id, name: type.name };
};

export { type };
