import { getPetSubtypeByIdDb } from "db/Pets/getPetSubtypeByIdDb";
import { PetSubtype } from "db/Pets/types";

const subtype = async (parent): Promise<PetSubtype> => {
  const subtype = await getPetSubtypeByIdDb(parent.subtype);

  return subtype.name;
};

export { subtype };
