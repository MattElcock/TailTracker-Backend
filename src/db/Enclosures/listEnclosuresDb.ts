import { client } from "knexClient";
import { EnclosureWithTypeDbJoin } from "./types";

const listEnclosuresDb = async (
  ownerId: string
): Promise<EnclosureWithTypeDbJoin[]> => {
  const response: EnclosureWithTypeDbJoin[] = await client
    .select([
      "enclosures.id",
      "enclosures.owner_id",
      "enclosures.name",
      "enclosure_types.name as type",
      "enclosures.created_at",
      "enclosures.updated_at",
    ])
    .from("enclosures")
    .join(
      "enclosure_types",
      "enclosures.enclosure_type_id",
      "enclosure_types.id"
    )
    .where({ "enclosures.owner_id": ownerId });

  return response;
};

export { listEnclosuresDb };
