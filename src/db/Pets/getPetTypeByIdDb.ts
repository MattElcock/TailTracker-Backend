import { client } from "knexClient";
import { PetTypesTable } from "./types";

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
