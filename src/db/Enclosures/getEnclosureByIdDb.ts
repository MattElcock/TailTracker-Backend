import { client } from "knexClient";
import { EnclosureWithTypeDbJoin } from "./types";

const getEnclosureByIdDb = async (
  id: string
): Promise<EnclosureWithTypeDbJoin> =>
  client.transaction(async function (trx) {
    const query = trx
      .join(
        "enclosure_types",
        "enclosures.enclosure_type_id",
        "enclosure_types.id"
      )
      .select([
        "enclosures.id",
        "enclosures.owner_id",
        "enclosures.name",
        "enclosure_types.name as type",
        "enclosures.created_at",
        "enclosures.updated_at",
      ])
      .from("enclosures")
      .where({ "enclosures.id": id })
      .first();

    return query;
  });

export { getEnclosureByIdDb };
