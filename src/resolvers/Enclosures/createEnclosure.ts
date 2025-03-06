import { createEnclosureDb } from "db/Enclosures/createEnclosureDb";
import { Context } from "types";
import { Enclosure, EnclosureType } from "./types";

interface Args {
  enclosure: {
    name: string;
    type: EnclosureType;
  };
}

const createEnclosure = async (
  _,
  { enclosure }: Args,
  { user }: Context
): Promise<Enclosure> => {
  const dbEnclosure = await createEnclosureDb({
    name: enclosure.name,
    type: enclosure.type,
    owner_id: user.id,
  });

  return {
    id: dbEnclosure.id,
    type: dbEnclosure.type,
    name: dbEnclosure.name,
  };
};

export { createEnclosure };
