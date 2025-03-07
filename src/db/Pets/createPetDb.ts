import { client } from "knexClient";
import { PetWithTypesDbJoin } from "./types";

const createPetDb = (
  pet: Pick<PetWithTypesDbJoin, "name" | "enclosure_id" | "subtype">
): Promise<PetWithTypesDbJoin> =>
  client.transaction(async function (trx) {
    // Retrieve the id of the pet subtype
    const [petSubtypeReturn] = await trx
      .select("id")
      .from("pet_subtypes")
      .where({ name: pet.subtype });

    const petSubtypeId = petSubtypeReturn?.id;

    if (!petSubtypeId) {
      throw new Error(`Cannot find pet type ID for type: ${pet.subtype}`);
    }

    // Create the pet
    const [createdPetReturn] = await trx
      .insert({
        enclosure_id: pet.enclosure_id,
        subtype_id: petSubtypeId,
        name: pet.name,
      })
      .into("pets")
      .returning(["id"]);

    const createdPetId = createdPetReturn?.id;

    if (!createdPetId) {
      throw new Error("Cannot retrieve pet ID after creation.");
    }

    // Return the pet, resolving the type and subtype names with a join
    const petReturn = await trx
      .from("pets")
      .join("pet_subtypes", "pet_subtypes.id", "pets.subtype_id")
      .join("pet_types", "pet_types.id", "pet_subtypes.type_id")
      .select([
        "pets.id",
        "pets.name",
        "pets.created_at",
        "pets.enclosure_id",
        "pets.updated_at",
        "pet_types.name as type",
        "pet_subtypes.name as subtype",
      ])
      .where({ "pets.id": createdPetId })
      .first();

    if (!petReturn) {
      throw new Error("Created pet cannot be retrieved.");
    }

    return petReturn;
  });

export { createPetDb };
