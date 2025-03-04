import { client } from "knexClient";
import { DbEnclosure } from "./types";

const listEnclosuresDb = async (ownerId: string): Promise<DbEnclosure[]> => {
  const response: DbEnclosure[] = await client
    .select(["id", "owner_id", "name", "type", "created_at", "updated_at"])
    .from("enclosures")
    .where({ owner_id: ownerId });

  return response;
};

export { listEnclosuresDb };
