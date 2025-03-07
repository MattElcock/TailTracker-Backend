import { getEnclosureByIdDb } from "db/Enclosures/getEnclosureByIdDb";
import { Enclosure } from "resolvers/types/Enclosures";

interface EnclosuresResolverReturn extends Omit<Enclosure, "type"> {
  type: string;
}

const enclosure = async (parent, _args): Promise<EnclosuresResolverReturn> => {
  const enclosure = await getEnclosureByIdDb(parent.enclosure);

  return {
    id: enclosure.id,
    name: enclosure.name,
    type: enclosure.enclosure_type_id,
  };
};

export { enclosure };
