import { client } from "knexClient";
import { EnclosureWithTypeDbJoin } from "./types";

const createEnclosureDb = async (
  enclosure: Pick<EnclosureWithTypeDbJoin, "name" | "type" | "owner_id">
): Promise<EnclosureWithTypeDbJoin> => {
  const [returnEnclosure] = await client.transaction(async function (trx) {
    // Retrieve the id of the enclosure type
    const [enclosureTypeReturn] = await trx
      .select("id")
      .from("enclosure_types")
      .where({ name: enclosure.type });

    const enclosureTypeId = enclosureTypeReturn?.id;

    if (!enclosureTypeId) {
      throw new Error(
        `Cannot find enclosure type ID for type: ${enclosure.type}`
      );
    }

    // Create the enclosure
    const [createdEnclosureReturn] = await trx
      .insert({
        owner_id: enclosure.owner_id,
        enclosure_type_id: enclosureTypeId,
        name: enclosure.name,
      })
      .into("enclosures")
      .returning(["id"]);

    const createdEnclosureId = createdEnclosureReturn?.id;

    if (!createdEnclosureId) {
      throw new Error("Cannot retrieve enclosure ID after creation.");
    }

    // Return the enclosure, resolving the type name with a join
    return trx
      .select([
        "enclosures.id",
        "enclosures.owner_id",
        "enclosures.name",
        "enclosure_types.name as type",
        "enclosures.created_at",
        "enclosures.updated_at",
      ])
      .from("enclosures")
      .join(
        "enclosure_types",
        "enclosures.enclosure_type_id",
        "enclosure_types.id"
      )
      .where({ "enclosures.id": createdEnclosureId });
  });

  return returnEnclosure;
};

export { createEnclosureDb };
