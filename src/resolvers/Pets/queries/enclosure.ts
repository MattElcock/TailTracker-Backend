import { getEnclosureByIdDb } from "@/db/Enclosures/getEnclosureByIdDb.js";
import { Enclosure } from "@/resolvers/types/Enclosures.js";
import { PetsResolverReturn } from "@/resolvers/Pets/queries/pets.js";

interface EnclosuresResolverReturn extends Omit<Enclosure, "type"> {
  type: string;
}

const enclosure = async (
  parent: PetsResolverReturn,
  _args: void
): Promise<EnclosuresResolverReturn> => {
  const enclosure = await getEnclosureByIdDb(parent.enclosure);

  return {
    id: enclosure.id,
    name: enclosure.name,
    type: enclosure.enclosure_type_id,
  };
};

export { enclosure };
