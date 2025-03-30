import { client } from "knexClient";
import { PetTypesTable } from "./types";

const getPetTypesDb = async (): Promise<PetTypesTable[]> =>
  client.transaction(async function (trx) {
    const query = trx.select(["id", "name"]).from("pet_types");

    return query;
  });

export { getPetTypesDb };
