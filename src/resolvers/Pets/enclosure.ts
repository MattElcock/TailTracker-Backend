import { getEnclosureByIdDb } from "db/Enclosures/getEnclosureByIdDb";
import { Enclosure } from "../types.ts/Enclosures";

const enclosure = async (parent, _args): Promise<Enclosure> => {
  const enclosure = await getEnclosureByIdDb(parent.enclosure);

  return enclosure;
};

export { enclosure };
