import { client } from "knexClient";
import { PetWithTypesDbJoin } from "./types";

interface Filters {
  enclosures?: {
    ownerId: string;
  };
  pets?: {
    enclosureId: string;
  };
}

const listPetsDb = (filters: Filters): Promise<PetWithTypesDbJoin[]> =>
  client.transaction(async function (trx) {
    const query = trx
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
      ]);

    if (filters.enclosures?.ownerId) {
      query.where("enclosures.owner_id", filters.enclosures.ownerId);
    }

    if (filters.pets?.enclosureId) {
      query.where("pets.enclosure_id", filters.pets.enclosureId);
    }

    return query;
  });

export { listPetsDb };
