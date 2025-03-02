import knex from "knex";

const client = knex({
  client: "postgresql",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "tailtracker",
    port: 5432,
  },
});

export { client };
