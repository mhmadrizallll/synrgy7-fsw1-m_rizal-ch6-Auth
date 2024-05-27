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
exports.paymentInvoice = exports.createInvoice = void 0;
const invoices_model_1 = require("../models/invoices.model");
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, name, amount, status } = req.body;
        const invoice = yield invoices_model_1.InvoicesModel.query().insert({
            user_id,
            name,
            amount,
            status,
        });
        res.status(201).json({ data: invoice });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.createInvoice = createInvoice;
const paymentInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const invoice = yield invoices_model_1.InvoicesModel.query().patchAndFetchById(id, {
            status: "paid",
        });
        res.status(200).json({ message: "Invoice paid", data: invoice });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.paymentInvoice = paymentInvoice;
