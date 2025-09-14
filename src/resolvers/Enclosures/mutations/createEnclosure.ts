import { createEnclosureDb } from "@/db/Enclosures/createEnclosureDb.js";
import { Enclosure } from "@/resolvers/types/Enclosures.js";
import { Context } from "@/types.js";

interface Args {
  enclosure: {
    name: string;
    enclosure_type_id: string;
  };
}

interface CreateEnclosureResolverReturn extends Omit<Enclosure, "type"> {
  type: string;
}

const createEnclosure = async (
  _: void,
  { enclosure }: Args,
  { user }: Context
): Promise<CreateEnclosureResolverReturn> => {
  const dbEnclosure = await createEnclosureDb({
    name: enclosure.name,
    enclosure_type_id: enclosure.enclosure_type_id,
    owner_id: user.id,
  });

  return {
    id: dbEnclosure.id,
    type: dbEnclosure.enclosure_type_id,
    name: dbEnclosure.name,
  };
};

export { createEnclosure };
