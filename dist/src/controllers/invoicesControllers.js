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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayment = exports.paymentInvoice = exports.createInvoice = void 0;
const invoices_model_1 = require("../models/invoices.model");
const uuid_1 = require("uuid");
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield invoices_model_1.InvoicesModel.query().select("id", "name", "amount", "status");
        res.status(200).json({ data: invoices });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err });
    }
});
exports.getPayment = getPayment;
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, amount, status } = req.body;
        const invoice = yield invoices_model_1.InvoicesModel.query().insert({
            id: (0, uuid_1.v4)(),
            user_id: (0, uuid_1.v4)(),
            name,
            amount,
            status,
        });
        const { user_id } = invoice, invoices = __rest(invoice, ["user_id"]);
        res.status(201).json({ status: true, data: invoices });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err });
    }
});
exports.createInvoice = createInvoice;
const paymentInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const invoice = yield invoices_model_1.InvoicesModel.query()
            .patchAndFetchById(id, {
            status: "paid",
        })
            .select("id", "name", "amount", "status");
        res
            .status(200)
            .json({ status: true, message: "Invoice paid", data: invoice });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err });
    }
});
exports.paymentInvoice = paymentInvoice;
