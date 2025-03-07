import { listEnclosuresDb } from "db/Enclosures/listEnclosuresDb";
import { Context } from "types";
import { Enclosure } from "../types.ts/Enclosures";

interface EnclosuresResolverReturn extends Omit<Enclosure, "type"> {
  type: string;
}

const enclosures = async (
  _parent,
  _args,
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
