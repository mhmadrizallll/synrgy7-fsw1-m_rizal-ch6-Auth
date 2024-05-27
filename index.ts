import express, { Express, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import router from "./src/routes";
import path from "path";

const knexInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "1",
    port: 5432,
    host: "127.0.0.1",
    database: "db_payment",
  },
});

Model.knex(knexInstance);

const app: Express = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Tentukan direktori views
const VIEWS_DIR = path.join(process.cwd(), "src", "views");
app.set("views", VIEWS_DIR);
// Setel engine view yang digunakan
app.set("view engine", "ejs");
// Menyajikan file statis dari direktori 'src/views'
app.use(express.static(VIEWS_DIR));
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
