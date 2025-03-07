import { getPetSubtypeByIdDb } from "db/Pets/getPetSubtypeByIdDb";
import { getPetTypeByIdDb } from "db/Pets/getPetTypeByIdDb";
import { PetSubtype } from "db/Pets/types";

const type = async (parent): Promise<PetSubtype> => {
  const subtype = await getPetSubtypeByIdDb(parent.subtype);
  const type = await getPetTypeByIdDb(subtype.type_id);

  return type.name;
};

export { type };
