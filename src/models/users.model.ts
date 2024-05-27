import { Model, ModelObject } from "objection";
import { InvoicesModel } from "./invoices.model";

export class UsersModel extends Model {
  id!: string;
  name!: string;
  password!: string;
  role!: string;

  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      invoices: {
        relation: Model.HasManyRelation,
        modelClass: InvoicesModel,
        join: {
          from: "users.id",
          to: "invoices.user_id",
        },
      },
    };
  }
}

export type Users = ModelObject<UsersModel>;
