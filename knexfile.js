// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "tailtracker",
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
  },
};

export default config;
