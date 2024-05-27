"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoicesControllers_1 = require("../controllers/invoicesControllers");
const router = express_1.default.Router();
router.post("/", invoicesControllers_1.createInvoice);
router.post("/payment/:id", invoicesControllers_1.paymentInvoice);
exports.default = router;
