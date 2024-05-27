"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesModel = void 0;
const objection_1 = require("objection");
const users_model_1 = require("./users.model");
class InvoicesModel extends objection_1.Model {
    static get tableName() {
        return "invoices";
    }
    static get relationMappings() {
        return {
            user: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: users_model_1.UsersModel,
                join: {
                    from: "invoices.user_id",
                    to: "users.id",
                },
            },
        };
    }
}
exports.InvoicesModel = InvoicesModel;
