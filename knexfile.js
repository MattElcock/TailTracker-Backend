import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const environment = process.env.NODE_ENV || "development";

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
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
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

export default config[environment]; // Use selected environment
