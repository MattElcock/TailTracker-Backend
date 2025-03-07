import { getEnclosureTypeByIdDb } from "db/Enclosures/getEnclosureTypeByIdDb";
import { EnclosureTypeName } from "db/Enclosures/types";

const type = async (parent): Promise<EnclosureTypeName> => {
  const enclosureType = await getEnclosureTypeByIdDb(parent.type);

  return enclosureType.name;
};

export { type };
