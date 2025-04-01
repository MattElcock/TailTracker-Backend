import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

enum Environment {
  Development = "development",
  Production = "production",
}

const environment: Environment =
  (process.env.NODE_ENV as Environment) || Environment.Development;

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
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
  },
};

const client = knex(config[environment]);

export { client };
