import { client } from "@/knexClient.js";
import { EnclosureTypeTable } from "./types.js";

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
