/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("firebase_id").notNullable().unique();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.timestamp("seen_app_purpose_disclaimer");
    table.timestamps(true, true); // Adds created_at & updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
