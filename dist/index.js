"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const routes_1 = __importDefault(require("./src/routes"));
const path_1 = __importDefault(require("path"));
const knexInstance = (0, knex_1.default)({
    client: "pg",
    connection: {
        user: "postgres",
        password: "1",
        port: 5432,
        host: "127.0.0.1",
        database: "db_payment",
    },
});
objection_1.Model.knex(knexInstance);
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Tentukan direktori views
const VIEWS_DIR = path_1.default.join(process.cwd(), "src", "views");
app.set("views", VIEWS_DIR);
// Setel engine view yang digunakan
app.set("view engine", "ejs");
// Menyajikan file statis dari direktori 'src/views'
app.use(express_1.default.static(VIEWS_DIR));
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
