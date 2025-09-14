import { getEnclosureTypeByIdDb } from "@/db/Enclosures/getEnclosureTypeByIdDb.js";
import { EnclosureTypeName } from "@/db/Enclosures/types.js";
import { EnclosuresResolverReturn } from "./enclosures.js";

const type = async (
  parent: EnclosuresResolverReturn
): Promise<EnclosureTypeName> => {
  const enclosureType = await getEnclosureTypeByIdDb(parent.type);

  return enclosureType.name;
};

export { type };
