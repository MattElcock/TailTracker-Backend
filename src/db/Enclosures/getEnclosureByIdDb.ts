import { client } from "@/knexClient.js";
import { EnclosureTable } from "./types.js";

const getEnclosureByIdDb = async (id: string): Promise<EnclosureTable> =>
  client.transaction(async function (trx) {
    const query = trx
      .select([
        "id",
        "owner_id",
        "name",
        "enclosure_type_id",
        "created_at",
        "updated_at",
      ])
      .from("enclosures")
      .where({ id: id })
      .first();

    return query;
  });

export { getEnclosureByIdDb };
