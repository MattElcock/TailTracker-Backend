import { listEnclosuresDb } from "db/Enclosures/listEnclosuresDb";
import { Enclosure } from "resolvers/types/Enclosures";
import { Context } from "types";

export interface EnclosuresResolverReturn extends Omit<Enclosure, "type"> {
  type: string;
}

const enclosures = async (
  _parent: void,
  _args: void,
  { user }: Context
): Promise<EnclosuresResolverReturn[]> => {
  const enclosures = await listEnclosuresDb(user.id);

  return enclosures.map((enclosure) => ({
    id: enclosure.id,
    name: enclosure.name,
    type: enclosure.enclosure_type_id,
  }));
};

export { enclosures };
