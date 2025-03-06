/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  // Create pet types table
  await knex.schema.createTable("pet_types", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").unique().notNullable();
  });

  // Insert some pet types
  const insertedPetTypes = await knex("pet_types")
    .insert([{ name: "cat" }, { name: "dog" }, { name: "rodent" }])
    .returning(["id", "name"]);

  // Create pet subtypes table
  await knex.schema.createTable("pet_subtypes", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("type_id")
      .notNullable()
      .references("id")
      .inTable("pet_types")
      .onDelete("CASCADE");
    table.string("name").unique().notNullable();
  });

  // Find IDs for created pet types
  const catId = insertedPetTypes.find((petType) => petType.name === "cat")?.id;
  const dogId = insertedPetTypes.find((petType) => petType.name === "dog")?.id;
  const rodentId = insertedPetTypes.find(
    (petType) => petType.name === "rodent"
  )?.id;

  // Check if any IDs are missing, and throw an error if so
  if (!catId || !dogId || !rodentId) {
    throw new Error("Failed to retrieve all pet type IDs.");
  }

  // Insert some pet subtypes
  await knex("pet_subtypes").insert([
    // For Cats
    {
      type_id: catId,
      name: "abyssinian",
    },
    {
      type_id: catId,
      name: "american_bobtail",
    },
    {
      type_id: catId,
      name: "american_curl",
    },
    // For Dogs
    {
      type_id: dogId,
      name: "akita",
    },
    {
      type_id: dogId,
      name: "alaskan_malamute",
    },
    {
      type_id: dogId,
      name: "australian_shepherd",
    },
    // For Rodents
    {
      type_id: rodentId,
      name: "chinchilla",
    },
    {
      type_id: rodentId,
      name: "degu",
    },
    {
      type_id: rodentId,
      name: "fancy_mouse",
    },
    {
      type_id: rodentId,
      name: "fancy_rat",
    },
  ]);

  // Create pets table
  await knex.schema.createTable("pets", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("enclosure_id")
      .notNullable()
      .references("id")
      .inTable("enclosures")
      .onDelete("CASCADE");
    table
      .uuid("subtype_id")
      .notNullable()
      .references("id")
      .inTable("pet_subtypes")
      .onDelete("RESTRICT");
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists("pets");
  await knex.schema.dropTableIfExists("pet_subtypes");
  await knex.schema.dropTableIfExists("pet_types");
};
