import { client } from "knexClient";
import { EnclosureTable } from "./types";

const listEnclosuresDb = async (ownerId: string): Promise<EnclosureTable[]> => {
  const response: EnclosureTable[] = await client
    .select([
      "id",
      "owner_id",
      "name",
      "enclosure_type_id",
      "created_at",
      "updated_at",
    ])
    .from("enclosures")
    .where({ owner_id: ownerId });

  return response;
};

export { listEnclosuresDb };
