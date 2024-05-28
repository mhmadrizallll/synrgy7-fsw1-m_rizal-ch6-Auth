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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.updateUsers = exports.loginUser = exports.registerUsers = exports.getUsersByName = exports.getUsers = void 0;
const users_model_1 = require("../models/users.model");
const uuid_1 = require("uuid");
const bcrypt_1 = require("../helpers/bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.UsersModel.query();
    res.status(200).json({ data: users });
});
exports.getUsers = getUsers;
const getUsersByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const user = yield users_model_1.UsersModel.query().findOne({ name });
        if (!user) {
            res.status(400).json({ status: false, message: "User not found" });
        }
        res.status(200).json({ status: true, data: user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err });
    }
});
exports.getUsersByName = getUsersByName;
const registerUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { password, name, email } = _a, users = __rest(_a, ["password", "name", "email"]);
        const validatePassword = (password) => {
            const capitalLetter = /^[A-Z]/;
            const containNumber = /[0-9]/;
            const containSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
            if (capitalLetter.test(password) &&
                containNumber.test(password) &&
                containSpecialChar.test(password)) {
                return true;
            }
            return false;
        };
        if (!name || name.trim() === "") {
            return res.status(400).json({ status: false, message: "Name not valid" });
        }
        if (!email || email.trim() === "") {
            return res
                .status(400)
                .json({ status: false, message: "Email not valid" });
        }
        if (!validatePassword(password)) {
            return res
                .status(400)
                .json({ status: false, message: "Password not valid" });
        }
        const payload = Object.assign(Object.assign({}, users), { password: yield (0, bcrypt_1.encryptPassword)(password), id: (0, uuid_1.v4)(), name, email: email.toLowerCase() });
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
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const user = yield users_model_1.UsersModel.query().findOne({ email });
        if (!user) {
            res.status(400).json({ status: false, message: "User not found" });
        }
        else {
            const isPasswordCorrect = yield (0, bcrypt_1.checkPassword)(user.password, password);
            if (!isPasswordCorrect) {
                res.status(400).json({ status: false, message: "Wrong password" });
            }
            else {
                const payload = {
                    id: user.id,
                    role: user.role,
                };
                const token = jsonwebtoken_1.default.sign(payload, "secret", { expiresIn: "30d" });
                res.status(200).json({
                    status: true,
                    message: "Login successful",
                    token,
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err });
    }
});
exports.loginUser = loginUser;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const _b = req.body, { name, email, password } = _b, users = __rest(_b, ["name", "email", "password"]);
        const validatePassword = (password) => {
            const capitalLetter = /^[A-Z]/;
            const containNumber = /[0-9]/;
            const containSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
            if (capitalLetter.test(password) &&
                containNumber.test(password) &&
                containSpecialChar.test(password)) {
                return true;
            }
            return false;
        };
        if (!name || name.trim() === "") {
            res.status(400).json({ status: false, message: "Name not valid" });
            return;
        }
        if (!email || email.trim() === "") {
            res.status(400).json({ status: false, message: "Email not valid" });
            return;
        }
        if (!validatePassword(password)) {
            res.status(400).json({ status: false, message: "Password not valid" });
            return;
        }
        const user = yield users_model_1.UsersModel.query().findById(id);
        if (!user) {
            res.status(400).json({ status: false, message: "User not found" });
        }
        const updateUsers = Object.assign(Object.assign({}, users), { name, email: email.toLowerCase(), password: yield (0, bcrypt_1.encryptPassword)(password) });
        yield users_model_1.UsersModel.query().updateAndFetchById(id, updateUsers);
        res
            .status(200)
            .json({ status: true, message: "User updated", data: updateUsers });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err });
    }
});
exports.updateUsers = updateUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield users_model_1.UsersModel.query().deleteById(id);
        res.status(200).json({ status: true, message: "User deleted" });
    }
    catch (err) {
        res.status(500).json({ status: false, message: err });
    }
});
exports.deleteUsers = deleteUsers;
