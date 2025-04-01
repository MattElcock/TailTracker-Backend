import { getEnclosureTypeByIdDb } from "db/Enclosures/getEnclosureTypeByIdDb";
import { EnclosureTypeName } from "db/Enclosures/types";
import { EnclosuresResolverReturn } from "./enclosures";

const type = async (
  parent: EnclosuresResolverReturn
): Promise<EnclosureTypeName> => {
  const enclosureType = await getEnclosureTypeByIdDb(parent.type);

  return enclosureType.name;
};

export { type };
