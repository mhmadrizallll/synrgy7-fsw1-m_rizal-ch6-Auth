"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ status: false, message: "Invalid token" });
            return;
        }
        jsonwebtoken_1.default.verify(authorization.split(" ")[1], "secret");
        next();
    }
    catch (err) {
        res.status(500).json({ status: false, message: err });
    }
};
exports.authorization = authorization;
