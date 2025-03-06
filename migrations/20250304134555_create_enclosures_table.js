/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  // Create enclosure types table
  await knex.schema.createTable("enclosure_types", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").unique().notNullable();
  });

  // Insert some enclosure types
  await knex("enclosure_types").insert([
    { name: "free_roam" },
    { name: "cage" },
  ]);

  // Create enclosures table
  await knex.schema.createTable("enclosures", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .uuid("enclosure_type_id")
      .notNullable()
      .references("id")
      .inTable("enclosure_types")
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
  await knex.schema.dropTableIfExists("enclosures");
  await knex.schema.dropTableIfExists("enclosure_types");
};
