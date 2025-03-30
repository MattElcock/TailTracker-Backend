import { client } from "knexClient";
import { PetSubtypeTable } from "./types";

const listPetSubtypes = async (petTypeId: string): Promise<PetSubtypeTable[]> =>
  client.transaction(async function (trx) {
    const query = trx
      .select(["id", "name", "type_id"])
      .from("pet_subtypes")
      .where({ type_id: petTypeId });

    return query;
  });

export { listPetSubtypes };
