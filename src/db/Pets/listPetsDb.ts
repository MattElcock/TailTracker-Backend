import { client } from "knexClient";
import { PetWithTypesDbJoin } from "./types";

const listPetsDb = (ownerId: string): Promise<PetWithTypesDbJoin[]> =>
  client.transaction(async function (trx) {
    const response = trx
      .from("pets")
      .join("pet_subtypes", "pet_subtypes.id", "pets.subtype_id")
      .join("pet_types", "pet_types.id", "pet_subtypes.type_id")
      .join("enclosures", "enclosures.id", "pets.enclosure_id")
      .select([
        "pets.id",
        "pets.name",
        "pets.created_at",
        "pets.updated_at",
        "pet_types.name as type",
        "pet_subtypes.name as subtype",
      ])
      .where({ "enclosures.owner_id": ownerId });

    return response;
  });

export { listPetsDb };
