import { client } from "@/knexClient.js";
import { PetSubtypeTable } from "./types.js";

const getPetSubtypeByIdDb = async (id: string): Promise<PetSubtypeTable> =>
  client.transaction(async function (trx) {
    const query = trx
      .select(["id", "name", "type_id"])
      .from("pet_subtypes")
      .where({ id: id })
      .first();

    return query;
  });

export { getPetSubtypeByIdDb };
