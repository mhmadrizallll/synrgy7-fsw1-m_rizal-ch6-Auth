import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { id: 1, name: "admin", password: "admin", role: "admin" },
    { id: 2, name: "customer1", password: "user", role: "customer" },
    { id: 3, name: "customer2", password: "user", role: "customer" },
    { id: 4, name: "customer3", password: "user", role: "customer" },
  ]);
}
