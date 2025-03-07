import { client } from "knexClient";
import { EnclosureTable } from "./types";

const createEnclosureDb = async (
  enclosure: Pick<EnclosureTable, "name" | "enclosure_type_id" | "owner_id">
): Promise<EnclosureTable> => {
  const [returnEnclosure] = await client.transaction(async function (trx) {
    // Create the enclosure
    const query = trx
      .insert({
        owner_id: enclosure.owner_id,
        enclosure_type_id: enclosure.enclosure_type_id,
        name: enclosure.name,
      })
      .into("enclosures")
      .returning([
        "id",
        "owner_id",
        "name",
        "enclosure_type_id",
        "created_at",
        "updated_at",
      ]);

    return query;
  });

  return returnEnclosure;
};

export { createEnclosureDb };
