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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewLogin = exports.loginUser = exports.deleteUsers = exports.updateUsers = exports.addUsers = exports.getUsers = exports.registerUsers = void 0;
const users_model_1 = require("../models/users.model");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, 10, (err, result) => {
            if (!!err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};
const checkPassword = (encryptPassword, password) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, encryptPassword, (err, result) => {
            if (!!err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};
const registerUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign(Object.assign({}, req.body), { password: yield encryptPassword(req.body.password), id: (0, uuid_1.v4)() });
        const user = yield users_model_1.UsersModel.query().findOne({ name: payload.name });
        if (user) {
            return res
                .status(400)
                .json({ status: false, message: "User already exists" });
        }
        yield users_model_1.UsersModel.query().insert(payload);
        res
            .status(201)
            .json({ status: true, message: "User created", data: payload });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.registerUsers = registerUsers;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.UsersModel.query();
    res.status(200).json({ data: users });
});
exports.getUsers = getUsers;
const addUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, role } = req.body;
        const user = yield users_model_1.UsersModel.query().insert({
            name,
            password,
            role,
        });
        res.status(201).json({ data: user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.addUsers = addUsers;
// login
const viewLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render("index");
});
exports.viewLogin = viewLogin;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const user = yield users_model_1.UsersModel.query().findOne({ name });
        if (!user) {
            res.status(400).json({ status: false, message: "User not found" });
        }
        else {
            const isPasswordCorrect = yield checkPassword(user.password, password);
            if (!isPasswordCorrect) {
                res.status(400).json({ status: false, message: "Wrong password" });
            }
            else {
                res
                    .status(200)
                    .json({ status: true, message: "Login successful", data: user });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err });
    }
});
exports.loginUser = loginUser;
// end
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
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.updateUsers = updateUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield users_model_1.UsersModel.query().deleteById(id);
        res.status(200).json({ message: "User deleted" });
    }
    catch (_a) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteUsers = deleteUsers;
