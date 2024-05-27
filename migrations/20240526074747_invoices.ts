import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("invoices", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable();
    table.string("name").notNullable();
    table.integer("amount").notNullable();
    table.enum("status", ["unpaid", "paid"]).defaultTo("unpaid");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("invoices");
}
