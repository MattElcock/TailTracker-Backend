import { client } from "knexClient";
import { EnclosureTypeTable } from "./types";

const getEnclosureTypeByIdDb = async (
  id: string
): Promise<EnclosureTypeTable> =>
  client.transaction(async function (trx) {
    const query = trx
      .select(["id", "name"])
      .from("enclosure_types")
      .where({ id: id })
      .first();

    return query;
  });

export { getEnclosureTypeByIdDb };
