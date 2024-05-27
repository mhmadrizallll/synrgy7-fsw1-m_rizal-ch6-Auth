import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "1",
      port: 5432,
      host: "127.0.0.1",
      database: "db_payment",
    },
  },
};

module.exports = config;
