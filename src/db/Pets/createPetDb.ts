import { client } from "@/knexClient.js";
import { PetsTable } from "./types.js";

const createPetDb = (
  pet: Pick<PetsTable, "name" | "enclosure_id" | "subtype_id">
): Promise<PetsTable> =>
  client.transaction(async function (trx) {
    const [createdPetReturn] = await trx
      .insert({
        enclosure_id: pet.enclosure_id,
        subtype_id: pet.subtype_id,
        name: pet.name,
      })
      .into("pets")
      .returning([
        "id",
        "name",
        "subtype_id",
        "enclosure_id",
        "created_at",
        "updated_at",
      ]);

    return createdPetReturn;
  });

export { createPetDb };
