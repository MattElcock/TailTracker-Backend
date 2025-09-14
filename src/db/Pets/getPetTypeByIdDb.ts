import { client } from "@/knexClient.js";
import { PetTypesTable } from "./types.js";

const getPetTypeByIdDb = async (id: string): Promise<PetTypesTable> =>
  client.transaction(async function (trx) {
    const query = trx
      .select(["id", "name"])
      .from("pet_types")
      .where({ id: id })
      .first();

    return query;
  });

export { getPetTypeByIdDb };
