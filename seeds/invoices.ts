import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("invoices").del();

  // Inserts seed entries
  await knex("invoices").insert([
    { id: 1, user_id: 2, name: "Kredit Hp", amount: 100000, status: "unpaid" },
    {
      id: 2,
      user_id: 3,
      name: "Kredit Motor",
      amount: 500000,
      status: "unpaid",
    },
    {
      id: 3,
      user_id: 4,
      name: "Kredit Laptop",
      amount: 300000,
      status: "paid",
    },
    { id: 4, user_id: 4, name: "Kredit Hp", amount: 200000, status: "unpaid" },
  ]);
}
