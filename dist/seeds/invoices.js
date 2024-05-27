"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("invoices").del();
        // Inserts seed entries
        yield knex("invoices").insert([
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
    });
}
exports.seed = seed;
