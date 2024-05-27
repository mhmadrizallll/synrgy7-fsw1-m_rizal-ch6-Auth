import { Model, ModelObject } from "objection";
import { UsersModel } from "./users.model";

export class InvoicesModel extends Model {
  id!: string;
  user_id!: string;
  name!: string;
  amount!: number;
  status!: string;

  static get tableName() {
    return "invoices";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: "invoices.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export type Invoices = ModelObject<InvoicesModel>;
