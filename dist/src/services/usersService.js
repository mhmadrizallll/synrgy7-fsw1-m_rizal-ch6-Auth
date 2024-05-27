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
exports.deleteUsers = exports.updateUsers = exports.addUsers = exports.getUsers = void 0;
const users_model_1 = require("../models/users.model");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.UsersModel.query().withGraphFetched("invoices");
    res.status(200).json({ data: users });
});
exports.getUsers = getUsers;
const addUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, role } = req.body;
        const user = yield users_model_1.UsersModel.query().insert({ name, password, role });
        res.status(201).json({ data: user });
    }
    catch (_a) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addUsers = addUsers;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const { name, password, role } = req.body;
        const user = yield users_model_1.UsersModel.query().patchAndFetchById(id, {
            name,
            password,
            role,
        });
        res.status(200).json({ data: user });
    }
    catch (_b) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUsers = updateUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield users_model_1.UsersModel.query().deleteById(id);
        res.status(200).json({ data: user });
    }
    catch (_c) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteUsers = deleteUsers;
