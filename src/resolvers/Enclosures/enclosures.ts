import { listEnclosuresDb } from "db/Enclosures/listEnclosuresDb";
import { Context } from "types";
import { Enclosure } from "./types";

const enclosures = async (
  _parent,
  _args,
  { user }: Context
): Promise<Enclosure[]> => {
  const enclosures = await listEnclosuresDb(user.id);

  return enclosures.map((enclosure) => ({
    id: enclosure.id,
    name: enclosure.name,
    type: enclosure.type,
  }));
};

export { enclosures };
