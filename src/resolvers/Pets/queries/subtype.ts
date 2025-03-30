import { getPetSubtypeByIdDb } from "db/Pets/getPetSubtypeByIdDb";
import { PetSubtype } from "db/Pets/types";

interface ResolverReturn {
  id: string;
  name: PetSubtype;
}

const subtype = async (parent): Promise<ResolverReturn> => {
  const subtype = await getPetSubtypeByIdDb(parent.subtype);

  return { id: subtype.id, name: subtype.name };
};

export { subtype };
