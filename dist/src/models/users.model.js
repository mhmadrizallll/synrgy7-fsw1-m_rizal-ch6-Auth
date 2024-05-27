"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const objection_1 = require("objection");
const invoices_model_1 = require("./invoices.model");
class UsersModel extends objection_1.Model {
    static get tableName() {
        return "users";
    }
    static get relationMappings() {
        return {
            invoices: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: invoices_model_1.InvoicesModel,
                join: {
                    from: "users.id",
                    to: "invoices.user_id",
                },
            },
        };
    }
}
exports.UsersModel = UsersModel;
