"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersControllers_1 = require("../controllers/usersControllers");
const authorization_1 = require("../middlewares/authorization");
const router = express_1.default.Router();
router.get("/", authorization_1.authorization, usersControllers_1.getUsers);
router.get("/", usersControllers_1.getUsersByName);
router.post("/register", usersControllers_1.registerUsers);
router.post("/login", usersControllers_1.loginUser);
router.put("/:id", usersControllers_1.updateUsers);
router.delete("/:id", usersControllers_1.deleteUsers);
exports.default = router;
