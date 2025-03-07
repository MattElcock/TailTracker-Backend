import { client } from "knexClient";
import { PetsTable } from "./types";

interface Filters {
  enclosures?: {
    ownerId: string;
  };
  pets?: {
    enclosureId: string;
  };
}

const listPetsDb = (filters: Filters): Promise<PetsTable[]> =>
  client.transaction(async function (trx) {
    const query = trx
      .join("enclosures", "enclosures.id", "pets.enclosure_id")
      .from("pets")
      .select([
        "pets.id",
        "pets.name",
        "pets.enclosure_id",
        "pets.subtype_id",
        "pets.created_at",
        "pets.updated_at",
      ]);

    // Only allow viewing pets within enclosures they own
    if (filters.enclosures?.ownerId) {
      query.where("enclosures.owner_id", filters.enclosures.ownerId);
    }

    if (filters.pets?.enclosureId) {
      query.where("pets.enclosure_id", filters.pets.enclosureId);
    }

    return query;
  });

export { listPetsDb };
